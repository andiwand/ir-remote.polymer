var gridster;
var edit;
var drag;

$(function() {
  gridster = $(".gridster > ul").gridster({
    widget_margins: [5, 5],
    widget_base_dimensions: [50, 50],
    resize: {
      enabled: true
    },
    draggable: {
      start: function(e) {
        drag = true;
      }
    }
  }).data("gridster");
  edit = true;
  addButton();
  addButton();
  switchEdit();

  var contentElement = $(".content");
  $(".side-menu").click(function() {
    selectSideMenuItem($(this).attr("hash"));
  });
});

function selectSideMenuItem(hash) {
  $(".content").prop("selected", hash);
  var selectedItem = $(".side-menu[hash='" + hash + "']");
  selectedItem.prop("active", "active").addClass("core-selected");
  $(".side-menu").not(selectedItem).removeProp("active").removeClass("core-selected");
}

// TODO: do it with onmousedown
function checkDrag() {
  var result = drag;
  drag = false;
  return result;
}

function switchEdit() {
  if (edit) {
    gridster.disable();
    gridster.disable_resize();
  } else {
    gridster.enable();
    gridster.enable_resize();
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

  } else {
    console.log("send");
  }
}

function dicover() {

}
