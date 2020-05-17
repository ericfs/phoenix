
/* SPACES */

// setKeyHandler ( 'tab', HYPER, () => switchSpace ( 1 ) );

// setKeyHandler ( 'tab', HYPER_SHIFT, () => switchSpace ( -1 ) );

function moveWindowToSpace(spaceOffset) {
  const window = Window.focused();
  if (!window) {
    return;
  }
  if (Space.all().length < 2) {
    return;
  }

  const currentIndex = getSpaceIndex();
  const nextIndex = currentIndex + spaceOffset;
  const nextSpace = Space.all()[nextIndex];
  if (!nextSpace) {
    return;
  }
  const spaces = window.spaces();
  if (spaces.length == 0) {
    return;
  }
  spaces[0].removeWindows([window]);
  nextSpace.addWindows([window]);
}

setKeyHandler( 'right', ['ctrl', 'cmd'], () => moveWindowToSpace(1));

setKeyHandler( 'left', ['ctrl', 'cmd'], () => moveWindowToSpace(-1));
