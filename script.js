var gridster;
var edit;
var drag;

$(function() {
  gridster = $(".gridster > ul").gridster({
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

  menuSelect(document.getElementById("menu").items[0]);
});

function menuSelect(menu) {
  var index = menu.getAttribute("index");
  $("#pages").get(0).select(index);
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
  $(".edit-dialog").get(0).toggle();
}

function saveEdit() {
  console.log("save");
}

function dicover() {

}
