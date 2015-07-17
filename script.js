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

  var remoteDialog = document.getElementById("dialog-remote");
  remoteDialog.addEventListener("accept", acceptRemoteDialog);
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

// TODO: do it with onmousedown
function checkDrag() {
  var result = drag;
  drag = false;
  return result;
}

function remoteSetEditable(editable) {
  $("#remote-cast").attr("hidden", editable);
  $("#remote-add").attr("hidden", !editable);
  $("#remote-edit").attr("hidden", editable);
  $("#remote-save").attr("hidden", !editable);

  document.getElementById("remote").setEditable(editable);
  document.getElementById("remote").setEnabled(!editable);

  remoteEditable = editable;
}

function remoteStartEdit() {
  remoteSetEditable(true);
}

function remoteEndEdit() {
  remoteSetEditable(false);

  var ui = document.getElementById("remote").save();
  console.log(ui);
  currentRemote.ui = ui;
}

function remoteAddButton() {
  document.getElementById("remote").addButton();
}

function remoteClickButton(event) {
  if (remoteEditable) {
    toggleEditDialog();
  } else {
    console.log("send");
  }
}

function acceptRemoteDialog() {
  var dialog = document.getElementById("dialog-remote");
  var remote = dialog.remote ? dialog.remote : {};

  dialog.get(remote);
  // TODO: outsource default gridster config
  $.extend(remote, {
    ui: {
      type: "grid",
      settings: {
        base_margin: [5, 5],
        base_dimension: [50, 50]
      },
      buttons: []
    }
  });

  if (!dialog.remote) IR.remote.state.remotes.push(remote)

  dialog.close();
}

function openRemoteDialog(remote) {
  var dialog = document.getElementById("dialog-remote");

  dialog.set(remote);
  dialog.remote = remote;
  dialog.open();
}

function onEditRemote(msg) {
  var remote = msg.detail;
  editRemote(remote);
}

function editRemote(remote) {
  openRemoteDialog(remote);
}

function onRemoveRemote(msg) {
  var remote = msg.detail;
  removeRemote(remote);
}

function removeRemote(remote) {
  var index = $.inArray(remote, IR.remote.state.remotes);
  IR.remote.state.remotes.splice(index, 1);
}

function onOpenRemote(msg) {
    var remote = msg.detail;
    openRemote(remote);
}

function openRemote(remote) {
  currentRemote = remote;

  var title = $("#remote-title");
  title.text(remote.name);

  selectRootPage("remote");

  document.getElementById("remote").load(remote.ui);
  remoteSetEditable(false);
}

function remoteCast() {
  var dialog = document.getElementById("dialog-cast");
  dialog.open();
}

function remoteBack() {
  document.getElementById("remote").destroy();

  // TODO: other solution?
  window.setTimeout(function() {
    selectRootPage("main");
  }, 0);
}
