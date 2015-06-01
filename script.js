var gridster;
var edit;
var drag;

$(function() {
  initGrister();

  selectMenu("remote");
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

function initPage(tag) {
  if (tag === "remote") initGrister();
}

function selectMenu(tag) {
  var menuTagName = $("#menu").attr("attrForSelected");
  var pagesTagName = $("#pages").attr("attrForSelected");
  var menuItem = $("#menu").find("[" + menuTagName + "='" + tag + "']").get(0);
  var page = $("#pages").find("[" + pagesTagName + "='" + tag + "']").get(0);
  var menuIndex = $("#menu").get(0).indexOf(menuItem);
  var pageIndex = $("#pages").get(0).indexOf(page);

  $("#menu").get(0).select(menuIndex);
  $("#pages").get(0).select(pageIndex);

  initPage(tag);
}

function menuSelect(menu) {
  var tagName = $("#menu").attr("attrForSelected");
  var tag = menu.getAttribute(tagName);
  selectMenu(tag);
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
