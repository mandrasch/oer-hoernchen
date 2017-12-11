/* globals $, oer_provider_list, mixed_provider_list, console */

// BEWARE: quick & dirty coding ;-)
// feel free to improve & send a pull request <3
// 2DO: use namespaces!

// console.log fallback
if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

/*
 * jQuery functions
 */
 $(document).ready(function(){

  // 2DO: check if provider-list is set

  /* PAGE GENERATION */ 

  // generate the checkbox lists
  generateList(oer_provider_list,'#oer-provider-list');
  generateList(mixed_provider_list,'#mixed-provider-list');
  generateListNotCompatible(not_compatible_provider_list,'#not-compatible-provider-list');
  generateList(media_provider_list, '#media-provider-list');

  // generate checkboxes

  /* Image Checkbox Bootstrap template for multiple image selection
  https://www.prepbootstrap.com/bootstrap-template/image-checkbox */
  $(".image-checkbox").each(function () {
    $(this).toggleClass(
      'image-checkbox-checked',
      $(this).find('input[type="checkbox"]').first().attr("checked")
      );
  });

  // sync the state to the input
  $(".image-checkbox").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass('image-checkbox-checked');
    var $checkbox = $(this).find('input[type="checkbox"]');
    $checkbox.prop("checked",!$checkbox.prop("checked"));
  });

  /* eo image checkbox js */



    // clone the license filter box
    var new_div =  $(".license-filter-box:first").clone();
    new_div.prop('id', 'web-search-license-filter');
    $('select[name="license-filter"]',new_div).prop('name','web-search-license-filter');
    new_div.appendTo( "#web-search > .container > .row:first" );

    var new_div =  $(".license-filter-box:first").clone();
    new_div.prop('id', 'media-search-license-filter');
    $('select[name="license-filter"]',new_div).prop('name','media-search-license-filter');
    new_div.appendTo( "#media-search > .container > .row:first" );

    // 2DO: use polyfill https://davidwalsh.name/query-string-javascript
    // right now only for testing purposes
    if ('URLSearchParams' in window) {
      var urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('q')){
        var get_q = urlParams.get('q');
        $("#query-landing").val(get_q);
        $("#edu-projects-search-query").val(get_q);
        $("#web-search-query").val(get_q);
        $("#media-search-query").val(get_q);
      }
    }


    // github info message (preview, not offical version)
    if(document.location.hostname == 'programmieraffe.github.io'){
      $('#github-info-modal').modal();
    }


  /*
  * EVENTS
  */

  // listen for select change events

  // license filter explanation
  $('select[name="license-filter"], select[name="web-search-license-filter"], select[name="media-search-license-filter"]').change(function () {
    var val = $(this).find(":selected").val();
    var explanation_div = $(this).parent().find("div.license-explanation:first");
    $("div", explanation_div).hide();
    switch(val){
      case 'only-oer':
      $("div[data-value='oer']", explanation_div).show();
      break;
      case 'nc':
      $("div[data-value='oer']", explanation_div).show();
      $("div[data-value='nc']", explanation_div).show();
      break;
      case 'nc-nd':
      $("div[data-value='oer']", explanation_div).show();
      $("div[data-value='nc-nd']", explanation_div).show();
      break;
      case 'no-filter':
      $("div[data-value='no-filter']", explanation_div).show();
      break;
    }
  }).change();


  // listen for submit events

  $('#landing-form').submit(function(e){
    e.preventDefault();
    $('#search-button-landing').trigger('click');
  });

  // landing section button, add query to other input form field (down below)
  $('#search-button-landing').click(function(e){
    e.preventDefault();
    var val = $("#query-landing").val();
    $("#edu-projects-search-query").val(val).focus();
    $("#web-search-query").val(val);
    $("#media-search-query").val(val);

  });

  // 2DO: enter key action on first form field?

  $('#edu-projects-search-form').submit(function(e){
    e.preventDefault();
    performSearch('edu-projects');
  });

  $(".edu-projects-search-submit-button").click(function(e){
    //console.log('search button click event');
    e.preventDefault();
    performSearch('edu-projects');
  });

  $('#web-search-form').submit(function(e){
    e.preventDefault();
    performSearch('web');
  });

  $(".web-search-submit-button").click(function(e){
    //console.log('search button click event');
    e.preventDefault();
    performSearch('web');
  });

  $('#media-search-form').submit(function(e){
    e.preventDefault();
    performSearch('media');
  });

  $(".media-search-submit-button").click(function(e){
    //console.log('search button click event');
    e.preventDefault();
    performSearch('media');
  });

  // select all / deselect all buttons
  $(".oer-squirrel-select-all-button").click(function(e){
    e.preventDefault();
    $(this).parents(".card-body").find(".image-checkbox:not(.image-checkbox-checked)").trigger("click");
  });
  $(".oer-squirrel-deselect-all-button").click(function(e){
    e.preventDefault();
    $(this).parents(".card-body").find(".image-checkbox-checked").trigger("click");
  });

  // deselect media providers
  $("#media-search button.oer-squirrel-deselect-all-button").trigger('click');

  // image checkbox enter action

  // bottom navbar
  $(".button-hide-navbar").click(function(e){
    e.preventDefault();
    $("#navbar-bottom").hide();
  });

}); // eo jquery

/* generate list for providers function */
var generateList = function(list,selector){
  $.each(list,function(index,object){
      // console.log(index,object.url)

      var data_providerid = "";
      if(object.hasOwnProperty("id")){
        data_providerid = object.id;
      }

      var html = '<div class="col-xs-6 col-sm-3 col-md-3 nopad text-center">'+
      '<a href="https://'+object.url+'">'+
      '<label class="image-checkbox">'+
      '<img class="img-fluid" src="provider_logos/'+object.image+'" alt="Logo '+object.name+'" title="'+object.name+'" />'+
      '<input type="checkbox" name="image" value="'+object.url+'" data-providerid="'+data_providerid+'" data-title="'+object.name+'" checked />'+
      '<i class="fa fa-check hidden"></i>'+
      '</label>'+
      '</a>'+
      '</div>';

      $(html).appendTo(selector);
    });
};

/* generate list for providers which are not compatible right now */
  // 2DO: optimize later
  var generateListNotCompatible = function(list,selector){
    $.each(list,function(index,object){
      // console.log(index,object.url)

      var html = '<div class="col-xs-6 col-sm-3 col-md-3 nopad text-center">'+
      '<a href="https://'+object.url+'" target="_blank">'+
      '<img class="img-fluid" src="provider_logos/'+object.image+'" alt="Logo '+object.name+'" title="'+object.name+'" />'+
      '</a>'+
      '</div>';

      $(html).appendTo(selector);
    });
  };

  /* perform search function */
  var performSearch = function(type){

    var url = ''; // the url we want to generate

    // reset error messages and hide everything to begin
    $('#search-link-modal').find('.search-error').hide();
    $('#search-link-modal .search-success').hide();  
    $('#search-link-modal .search-success-multiple').hide();


    var q = '';

    if(type === 'edu-projects'){
        // check the word/operator limit of 32 (google limit in search field)
        // 2DO: better selector
        var word_limit_reached = $("#edu-projects-search-query").val().split(' ').length + $("#edu-projects-search input[name='image']:checked").length > 32;

        // get selected checkbox values
        // 2DO: better naming for checkboxes!
        var site_filter_list = [];
        $.each($("#edu-projects-search input[name='image']:checked"), function(){
          site_filter_list.push('site:' + this.value);
        });
        //console.log('selected values',site_filter_list);

        // generate query parameter + append site filter list
        q = $("#edu-projects-search-query").val() + ' ' + site_filter_list.join(' OR '); //2DO: check if empty and show warning?
      }

      if(type === 'web'){
        q = $("#web-search-query").val();
      }

      if(type === 'edu-projects' || type === 'web'){
        // encode characters for google url
        url = 'https://www.google.de/search?as_q='+ encodeURI(q);

        // add license parameters
        // url = url + encodeURI('&as_rights=(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)');
        // copied from google, other url encode algorithm? (above one does not work)
        // 2DO: check if OER-license was selected

        if(type === 'edu-projects'){
          var license_filter_val = $("#edu-projects-search select[name='license-filter']").val();
        }
        else{
          var license_filter_val = $("#web-search select[name='web-search-license-filter']").val();
        }

        
        var url_license_filter = '';
        switch(license_filter_val){
          case 'only-oer':
              // as_rights=(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)
              url_license_filter = '&as_rights=%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%29.-%28cc_noncommercial%7Ccc_nonderived%29';
              break;
              case 'nc':
            // as_rights=(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial).-(cc_nonderived)
            url_license_filter = '&as_rights=%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%7Ccc_noncommercial%29.-%28cc_nonderived%29';
            break;
            case 'nc-nd':
            // as_rights=(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived)
            url_license_filter = '&as_rights=%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%7Ccc_noncommercial%7Ccc_nonderived%29';
            break;
          }
        // add filter to url (not possibly by operator in search query)
        url += url_license_filter;

        var lang_select_val = $("#web-search-language-select").val();
        if(type === 'web' && lang_select_val !== 'default'){
            // append language
            url += "&lr=" + lang_select_val;
          }

        // error message - word limit reached (32 words max)
        // 2DO: split in future versions in multiple search requests!
        if(word_limit_reached){
          $('#search-link-modal').find('.search-success').hide();
        }
        // everythings alright:
        else {
          $('#search-link-modal').find('.search-error').hide();
        }


        // add url and open modal dialog
        //console.log('set url to', url);
        var urlDiv = $('#search-link-modal').find('.modal-search-url:first');
        // change url to current generated
        urlDiv.attr('href', url);

        // piwik outlink tracking (experimental)
        urlDiv.off('click'); //unbind all click events
        urlDiv.on('click',function(){
          console.log('piwik tracking, tracking outlink: ',url);
          if (typeof _paq !== "undefined") {
            _paq.push(['trackLink', url, 'link']);
          }
        });
        // eo piwik link tracking

        $('#search-link-modal .search-success').show();  
        $('#search-link-modal').modal();
      }

      if(type === 'media'){

        // get selected checkbox values
        // 2DO: better naming for checkboxes!
        var url_list = [];
        var q = encodeURI($("#media-search-query").val());

        $.each($("#media-search input[name='image']:checked"), function(){

          var provider_id = $(this).data('providerid');
          var url_title = $(this).data('title');
          var new_url = '';
          var license_filter_val = $("#media-search select[name='media-search-license-filter']").val();
          var url_license_filter = '';

          switch(provider_id){
            case 'youtube':
            new_url = 'https://www.youtube.com/results?search_query=' + q + ',creativecommons';
            break;

            case 'flickr':
            switch(license_filter_val){
              case 'only-oer':
              url_license_filter = 'l=commderiv';
              break;
              case 'nc':
              url_license_filter = 'l=comm';
              break;
              case 'nc-nd':
              url_license_filter = 'l=cc';
              break;
            }
            new_url = 'https://flickr.com/search/?q='+q+'&'+url_license_filter+'';
            break;

            case 'googleimages':
            switch(license_filter_val){
              case 'only-oer':
              url_license_filter = 'fmc';
              break;
              case 'nc':
              url_license_filter = 'fm';
              break;
              case 'nc-nd':
              url_license_filter = 'f';
              break;
              case 'no-filter':
              url_license_filter = '';
              break;
            }
            new_url = "https://www.google.com/search?site=imghp&tbm=isch&q=" + q + "&tbs=sur:"+url_license_filter+'';
            break;

            case 'pixabay':
            new_url = 'https://pixabay.com/en/photos/?q=' + q;
            break;

            case 'freemusicarchive':
            switch(license_filter_val){
              case 'only-oer':
              url_license_filter = 'music-filter-CC-attribution-only=on&music-filter-CC-attribution-sharealike=1&music-filter-public-domain=1&music-filter-commercial-allowed=1&music-filter-remix-allowed=1';
              break;
              case 'nc':
              url_license_filter = 'music-filter-CC-attribution-only=on&music-filter-CC-attribution-sharealike=1&music-filter-CC-attribution-noncommercial=1&music-filter-CC-attribution-noncommercial-sharealike=1&music-filter-public-domain=1';
              break;
              case 'nc-nd':
              url_license_filter = 'music-filter-CC-attribution-only=on&music-filter-CC-attribution-sharealike=1&music-filter-CC-attribution-noderivatives=1&music-filter-CC-attribution-noncommercial=1&music-filter-CC-attribution-noncommercial-sharealike=1&music-filter-CC-attribution-noncommercial-noderivatives=1&music-filter-public-domain=1';
              break;
              case 'no-filter':
              url_license_filter = '';
              break;
            }
            new_url = 'https://freemusicarchive.org/search/?adv=1&quicksearch='+q+'&'+url_license_filter;
            break;

            case 'wikimediacommons':
            new_url = 'https://commons.wikimedia.org/w/index.php?title=Special:Search&title=Special:Search&redirs=0&search='+q+'&fulltext=Search&fulltext=Advanced+search&ns0=1&ns6=1&ns14=1&advanced=1';
            break;

            case 'edutags':
            switch(license_filter_val){
              case 'only-oer':
              url_license_filter = 'cc%5Bby%5D=1&cc%5Bby-sa%5D=1&cc%5Bcc0%5D=1';
              break;
              case 'nc':
              url_license_filter = 'cc%5Bby%5D=1&cc%5Bby-nc%5D=1&cc%5Bby-sa%5D=1&cc%5Bby-nc-sa%5D=1&cc%5Bcc0%5D=1';
              break;
              case 'nc-nd':
              url_license_filter = 'cc%5Bby%5D=1&cc%5Bby-nc%5D=1&cc%5Bby-sa%5D=1&cc%5Bby-nd%5D=1&cc%5Bby-nc-sa%5D=1&cc%5Bby-nc-nd%5D=1&cc%5Bcc0%5D=1';
              break;
              case 'no-filter':
              url_license_filter = '';
              break;
            }
            new_url = 'https://www.edutags.de/browse?fulltext='+q+'&'+url_license_filter;
            break;
          } // eo switch/case 

          if(new_url!==''){
            var new_url_element = {
              title : url_title,
              url : new_url
            };
            url_list.push(new_url_element);
          }

          // clear ul list
          $('#search-link-modal .search-success-multiple-list ul:first').html(' ');
          // append links
          for (var i = 0; i < url_list.length; i++) {
                // 2DO: translation
                var html = '<li><a href="'+url_list[i].url+'" target="_blank">'+url_list[i].title+' durchsuchen</a></li>';
                console.log('html',html)
                $('#search-link-modal .search-success-multiple-list ul:first').append(html);
          }

        }); // eo each

      // open modal and try to open urls
      $('#search-link-modal .search-success-multiple').show();
      $('#search-link-modal .search-success-multiple-list').hide();

      // unbind all event handlers
      $("#search-link-modal .search-success-multiple-open-urls").off();
      // add event handlers
      // 2DO: (better) namespace usage?
      $("#search-link-modal .search-success-multiple-open-urls").click(function(e){
        e.preventDefault();
        for (var i = 0; i < url_list.length; i++) {
          window.open( url_list[i].url, '_blank');
        }
        $('#search-link-modal .search-success-multiple-list').show();
      });

      //$('#search-link-modal').find('.modal-search-url').attr('href', url);
      $('#search-link-modal').modal();

      } // eo if type media

    } // eo performSearch
