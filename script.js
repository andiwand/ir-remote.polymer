var gridster;
var edit;
var drag;

$(function() {
  initGrister();

  selectRootPage("main");
  selectMain("remotes");
});

function initGrister() {
  $("#grid").html("<ul></ul>");
  gridster = $("#grid > ul").gridster({
    widget_class: "button",
    widget_margins: [5, 5],
    widget_base_dimensions: [50, 50],
    resize: {
      enabled: true
    }
  }).data("gridster");

  edit = true;
  addButton();
  addButton();
  switchEdit();
}

function selectRootPage(tag) {
  selectPage(tag, document.getElementById("pages"));
}

function selectMain(tag) {
  selectMenu(tag, document.getElementById("main-menu"));
}

function initPage(page, tag) {
  if (tag === "remote") initGrister();
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

// TODO: do it with onmousedown
function checkDrag() {
  var result = drag;
  drag = false;
  return result;
}

function switchEdit() {
  var addButton = $("#add-button");

  if (edit) {
    gridster.disable();
    gridster.disable_resize();

    addButton.attr("disabled", "true");
  } else {
    gridster.enable();
    gridster.enable_resize();

    addButton.removeAttr("disabled");
  }
  edit = !edit;
}

function cloneTemplate(selector, id) {
  var clone = selector.clone();
  if (id === "") {
  } else if (id) {
    clone.attr("id", id);
  } else {
    clone.removeAttr("id");
  }
  return clone;
}

function addButton() {
  if (!edit) return;
  if (checkDrag()) return;
  var button = cloneTemplate($("#button-template"));
  gridster.add_widget(button);
  button.click(button, clickButton);
}

function clickButton(event) {
  if (edit) {
    toggleEditDialog();
  } else {
    console.log("send");
  }
}

function toggleEditDialog() {
  console.log($(".edit-dialog"));
  $("#edit-dialog").get(0).toggle();
}

function saveEdit() {
  console.log("save");
}

function dicover() {

}

function addRemote() {
  var dialog = document.getElementById("dialog-remote-add");
  dialog.open();
}

function remoteBack() {
  // TODO: other solution?
  window.setTimeout(function() {
    selectRootPage("main");
  }, 0);
}
