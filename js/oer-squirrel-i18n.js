/*
*/
$(document).ready(function () {

    var i18n = $.i18n();
    var languages = [
        {val: 'de', text: 'DE'},
        {val: 'en', text: 'EN'}
    ];
    buildLanguageSelector();
    /**
     * extend parser to handle magic words, in this case 'link' to parse hyperlinks in translation files
     */
    $.extend($.i18n.parser.emitter, {
        link: function (nodes) {
            return '<a href="' + nodes[1] + '" target="_blank">' + nodes[0] + '</a>';
        }
    });
    /*
    listener for language switch
    */
    $("#language-switch select").on("change", function () {

        if (this.value === 'de') {
            /**
             * German is the root language, it is already set in HTML, so no need to replace anything
             */
            i18n.locale = 'de';
            location.reload();
        } else {
            /**
             * Replace the HTML content by loading and processing the specific json translation file.
             */
            i18n.locale = this.value;
            i18n.load('i18n/' + i18n.locale + '.json', 'en').done(
                function () {
                    /**
                     * translate automatically all marked items
                     */
                    $('body').i18n();
                    /**
                     * do some manual parsing for some parts of the content
                     */
                    parseContent();
                });
        }
    });

    /**
     * manual parsing based on html structure.
     */
    function parseContent() {
        $('#query-landing').attr("placeholder", $.i18n('header-input-placeholder'));

        $('#search-filter').find('.container').find('p').html($.i18n('search-filter-intro'));

        $('#search-filter-intro').html($.i18n('search-filter-intro'));
        $('#search-box').find('#query').attr("placeholder", $.i18n('search-query-input-placeholder'));

        $('.oer-squirrel-select-all-button').text($.i18n('button-select-all'));
        $('.oer-squirrel-deselect-all-button').text($.i18n('button-deselect-all'));

        //translate card box header by given
        $('.col-12').each(function () {
            $(this).find('.card-header').text($.i18n($(this).attr('id')));
        });
        //translate license options individually by label and input value
        $('#license-filter-box').find('label input').each(function () {
            var licenseVal = 'license-filter-' + ($(this).attr('value'));
            $(this).parent().find('span').text($.i18n(licenseVal));
        });
        $('#about-more-text').html($.i18n('about-tools-list'));
        $('#about-text').html($.i18n('about-text'));
        $('#footer-project-text').html($.i18n('footer-project-text'));
        $('#footer-license-text').html($.i18n('footer-license-text'));

        $('#modal-text-feedback').html($.i18n('modal-text-feedback'));
    }

    /**
     * create language selection box on top of the website, see #language-switch in corresponding CSS file
     */
    function buildLanguageSelector() {
        var sel = $('<select>').appendTo('#language-switch');
        $(languages).each(function () {
            sel.append($("<option>").attr('value', this.val).text(this.text));
        });
    }
});