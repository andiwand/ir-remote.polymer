var remoteEditable;
var currentRemote;

// TODO: remove
IR.interface.load = function(callback) {
  $.getJSON("config.json", function(data) {
    callback(data);
  });
};

$(function() {
  IR.remote.init();

  selectRootPage("main");
  selectMain("remotes");

  var remoteList = document.getElementById("list-remote");
  remoteList.addEventListener("open", onOpenRemote);
  remoteList.addEventListener("edit", onEditRemote);
  remoteList.addEventListener("remove", onRemoveRemote);

  var deviceList = document.getElementById("list-device");
});

function selectRootPage(tag) {
  selectPage(tag, document.getElementById("pages"));
}

function selectMain(tag) {
  selectMenu(tag, document.getElementById("main-menu"));
}

function initPage(page, tag) {

}

function selectPage(tag, pages) {
  var pagesTagName = pages.getAttribute("attrForSelected");
  var page = $(pages).find("[" + pagesTagName + "='" + tag + "']").get(0);
  var pageIndex = pages.indexOf(page);

  pages.select(pageIndex);

  initPage(page, tag);
}

function selectMenu(tag, menu) {
  var qMenu = $(menu);
  var menuTagName = qMenu.attr("attrForSelected");
  var menuIndex = menu.indexOf(
    qMenu.find("[" + menuTagName + "='" + tag + "']").get(0));
  var pages = document.getElementById(qMenu.attr("pages"));

  menu.select(menuIndex);
  selectPage(tag, pages);
}

function menuSelect(item) {
  var menu = $(item).closest("paper-menu");
  var tagName = menu.attr("attrForSelected");
  var tag = item.getAttribute(tagName);
  selectMenu(tag, menu.get(0));
}
