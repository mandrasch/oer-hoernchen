// 2DO: use namespaces!
//
/* globals $, oer_provider_list, mixed_provider_list, console */
/*
 * Jquery functions
 */
$(document).ready(function(){

  // 2DO: check if provider-list is set

  // generate the checkbox lists
  generateList(oer_provider_list,'#oer-provider-list');
  generateList(mixed_provider_list,'#mixed-provider-list');
  generateListNotCompatible(not_compatible_provider_list,'#not-compatible-provider-list');

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

  // listen for submit events

  $('#landing-form').submit(function(e){
    e.preventDefault();
    $('#search-button-landing').trigger('click');
  });

  // landing section button, add query to other input form field (down below)
  $('#search-button-landing').click(function(e){
    e.preventDefault();
    var val = $("#query-landing").val();
    $("#query").val(val).focus();
  });

  // 2DO: enter key action on first form field?

   $('#search-form').submit(function(e){
    e.preventDefault();
    performSearch();
  });

  $(".search-button").click(function(e){
    //console.log('search button click event');
    e.preventDefault();
    performSearch();
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

  // image checkbox enter action


}); // eo jquery

/* generate list for providers function */
var generateList = function(list,selector){
    $.each(list,function(index,object){
      // console.log(index,object.url)

      var html = '<div class="col-xs-6 col-sm-3 col-md-3 nopad text-center">'+
      '<a href="https://'+object.url+'">'+
      '<label class="image-checkbox">'+
      '<img class="img-fluid" src="provider_logos/'+object.image+'" alt="Logo '+object.name+'" title="'+object.name+'" />'+
      '<input type="checkbox" name="image" value="'+object.url+'" checked />'+
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
  }

/* perform search function */
var performSearch = function(){

     // check the word/operator limit of 32 (google limit in search field)
    var word_limit_reached = $("#query").val().split(' ').length + $("input[name='image']:checked").length > 32;

    // get selected checkbox values
    // 2DO: better naming for checkboxes!
    var site_filter_list = [];
    $.each($("input[name='image']:checked"), function(){
      site_filter_list.push('site:' + this.value);
    });
    console.log('selected values',site_filter_list);

    // generate query parameter
    var q = $("#query").val() + ' ' + site_filter_list.join(' OR '); //2DO: check if empty

    // encode characters for url
    var url = 'https://www.google.de/search?as_q='+ encodeURI(q);

    // add license parameters
    // url = url + encodeURI('&as_rights=(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)');
    // copied from google, other url encode algorithm? (above one does not work)
    // 2DO: check if OER-license was selected

    var license_filter_val = $("input[type='radio'][name='license-filter']:checked").val();
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

    // generate modal html

    var html = '';

    // error message - word limit reached
    if(word_limit_reached){
      html = '<p><div class="alert alert-danger" role="alert">'+
      'Die Google-Suche erlaubt maximal 32 Wörter im Suchfeld, bitte weniger Suchbegriffe nutzen oder weniger Projekte auswählen (jedes Projekt zählt als ein Wort).'+
      '</div></p>'+
      '<p><a href="'+url+'" target="_blank">Suche trotzdem öffnen</a></p>';
    }
    // everythings alright:
    else{
        html = '<p>Die Suche wird in einem neuen Fenster aufgerufen. Eventuell wird das Öffnen durch einen Pop-Up-Blocker verhindert. Hier manuell öffnen:</p>'+
        '<p><a href="'+url+'" target="_blank">Suche in neuem Tab/Fenster öffnen</a></p>'+
            '<p>Link zum Teilen: '+
        ' <div class="input-group">'+
        '<input type="text" class="form-control" value="'+url+'">'+
        '<span class="input-group-btn">'+
        '<button class="btn btn-default" type="button">Kopieren</button>'+
        '</span>'+
        '</input>'+
        '</div>'+
        '</p>';
    }

    html += '<p>Feedback oder Fragen? Gerne <a href="https://matthias-andrasch.de/kontakt" target="_blank">hier</a> melden!</p>';

    $("#search-link-modal .modal-body").html(html);
    $('#search-link-modal').modal();

    // try to open new tab
    if(!word_limit_reached){

      window.open(url, '_blank').focus();
       // 2DO: good idea to use setTimeout?
       /*setTimeout(function(){
          var win = window.open(url, '_blank');
          //win.focus();
       }, 1500);*/
    }
  };
