jQuery(document).ready(function($) {
  vw = $(window).width();
  if (vw >= 1024) {
    var jPM = $.jPanelMenu({
      closeOnContentClick: false,
      openPosition: '22%',
      beforeOpen: function() {
        $('nav.chapters > .previous').hide();
        $('.menu-trigger').css('left', '22%');
        $('.jPanelMenu-panel').css('width', '78%');
      },
      beforeClose: function() {
        $('nav.chapters > .previous').show();
        $('.menu-trigger').css('left', '');
        $('.jPanelMenu-panel').css('width', '');
      },
    });
  } else {
    var jPM = $.jPanelMenu({
      beforeOpen: function() {
        $('nav.chapters > .previous').hide();
        $('.menu-trigger').css('left', 250);
      },
      beforeClose: function() {
        $('nav.chapters > .previous').show();
        $('.menu-trigger').css('left', '');
      },
    });
  }

  jPM.on();
  $('#menu').remove();

  //get all h2 class=submenu, put into list to insert into drom chapter menu
  var subitems = $.find('.content h2.submenu');
  var submenuID = '';
  var currentPage = window.location.hash;
  var currentNoHash = window.location.href.split('#')[0];
  var submenuMarkup;
  //iterate over each: get text, convert text to lowercase w slashes, insert id of prior to h2 tags,
  if (subitems.length > 0) {
    //if we HAVE submenu items
    submenuMarkup = '<ol>';
    $.each(subitems, function() {
      //get text
      submenuID = $(this).html();

      //title for sidemenu
      submenuTitle = submenuID;

      //convert text to lower case w/ slashes
      submenuID = submenuID.toLowerCase().replace(/ /g, '-');

      //add id tags to h2 elements
      $(this).attr('id', submenuID);

      //add list element to markup
      submenuMarkup +=
        '<li><a class="' +
        submenuID +
        '" href="' +
        currentNoHash +
        '#' +
        submenuID +
        '">' +
        submenuTitle +
        '</a></li>';
    });
    submenuMarkup += '</ol>';

    //find href of chapter-menu that == current href
    var subitems = $.find('#jPanelMenu-menu ol li a');
    var chapterHref = '';
    $.each(subitems, function() {
      //get chapter href
      chapterHref = $(this).attr('href');
      //compare
      if (chapterHref == currentNoHash) {
        //add markup here
        $(this)
          .parent()
          .append(submenuMarkup);
      }
    });
  }
});
