// Set defaults
let $activeElem = false
let timeout = 0

// Get gallery container and grid
const $gallery = document.querySelector('.grid-gallery')
const $grid = document.querySelector('.grid-gallery ul')

// Add note for a11y
let note = document.createElement('p')
note.innerHTML =
  'Press <kbd>Return</kbd> to zoom images and <kbd>Esc</kbd> to exit zoomed images.'
note.classList.add('key-note')
note.setAttribute('tabindex', '0')
$grid.parentNode.insertBefore(note, $grid)

// Get the scale factor
const scaleFactor = getComputedStyle($gallery).getPropertyValue(
  '--grid-gallery-scale-factor'
)

// Get the transition timeout from CSS
const getTimeouts = () => {
  const durationOn = parseFloat(
    getComputedStyle($gallery).getPropertyValue(
      '--grid-gallery-duration-expand'
    )
  )

  timeout = parseFloat(durationOn) * 100
}

// Get the top offset
const getTop = ($elem) => {
  const elemRect = $elem.getBoundingClientRect()

  return elemRect.top
}

// Set data attributes for calculations
const setDataAttrs = ($elems, $parent) => {
  // Get the top offset of the first element
  let top = getTop($elems[0])

  // Set grid item width from CSS
  const eStyle = getComputedStyle($elems[0])
  $parent.setAttribute('data-width', eStyle.width)

  // Iterate through grid items
  for (let i = 0; i < $elems.length; i++) {
    // Set default ARIA state
    let button = $elems[i].querySelector('button')
    button.setAttribute('aria-expanded', false)

    const t = getTop($elems[i])
    // Check when top offset changes
    if (t != top) {
      // Set the number of columns and stop the loop
      $parent.setAttribute('data-cols', i)
      break
    }
  }
}

// Deactivate grid items
const deactiveElems = ($elems, $parent, $currentElem, $button) => {
  // Unset parent class
  $parent.classList.remove('is-zoomed')

  for (let i = 0; i < $elems.length; i++) {
    // Unset item class
    $elems[i].classList.remove('is-zoomed')
    // Unset item CSS transform
    $elems[i].style.transform = 'none'

    // Skip the rest if the item is the current item
    if ($elems[i] === $currentElem) {
      continue
    }

    // Unset item aria expanded if element exists
    if ($button) {
      $button.setAttribute('aria-expanded', false)
    }

    // After half of the timeout, reset CSS z-index to avoid overlay issues
    setTimeout(() => {
      $elems[i].style.zIndex = 0
    }, timeout)
  }
}

// Set active item
const activateElem = ($elems, $parent, $elem, $button, lengthOfElems, i) => {
  // Get data attributes from parent
  const cols = parseInt($parent.getAttribute('data-cols'))
  const width = parseFloat($parent.getAttribute('data-width'))

  // If there is only a single column, prevent from executing
  if (cols === 1) {
    return
  }

  // Calculate the number of rows
  const rows = Math.ceil(lengthOfElems / cols) - 1

  // If there is only a single row, prevent from executing
  if (rows === 0) {
    return
  }

  // Reset all elements
  deactiveElems($elems, $parent, $elem, $button)

  // If there is active element, set focus to it, unset global active element,
  // and prevent from further executing
  if ($activeElem) {
    $activeElem.focus()
    $activeElem = false
    return
  }

  // Set default vertical transform origin to center (expand out)
  let transformOrigin = 'center'

  // If item is in the first row, set vertical transform origin to top (expand
  // down)
  const isFirstRow = i < cols
  if (isFirstRow) {
    transformOrigin = 'top'
  }

  // If item is in the last row, set vertical transform origin to bottom (expand
  // up)
  const isLastRow = i + 1 > rows * cols
  if (isLastRow) {
    transformOrigin = 'bottom'
  }

  // Determine which column the item is in
  const curColumn = (i % cols) + 1
  let isFirstCol = false
  let isLastCol = false
  let isRemainder = false

  if (curColumn === 1) {
    isFirstCol = true
  }

  if (curColumn === cols) {
    isLastCol = true
  }

  // Determine if an item in the last row is left over (not in a full row)
  if (isLastRow) {
    if (lengthOfElems % cols !== 0) {
      isRemainder = true
    }
  }

  if (isFirstCol) {
    // If the item is in the first column, set horizontal transform origin to
    // left (expand right), unless it is left over (thus center-positioned), in
    // which case set horizontal transform origin to center (expand out)
    if (!isRemainder) {
      transformOrigin += ' left'
    } else {
      transformOrigin += ' center'
    }
  } else if (isLastCol) {
    // If the item is in the last column, set horizontal transform origin to
    // right (expand left)
    transformOrigin += ' right'
  } else {
    // Otherwise, set horizontal transform origin to center (expand out)
    transformOrigin += ' center'
  }

  $elem.style.transformOrigin = transformOrigin

  // Calculate the scale coefficient
  const scale = (width * scaleFactor) / width

  // After a whole timeout...
  setTimeout(() => {
    // Set high CSS z-index to avoid overlay issues
    $elem.style.zIndex = 100
    // Set classes and CSS transform
    $parent.classList.add('is-zoomed')
    $elem.classList.add('is-zoomed')
    $elem.style.transform = `scale(${scale})`
    // Set item aria expanded
    $button.setAttribute('aria-expanded', true)
    // Set global active item
    $activeElem = $button
  }, timeout)
}

// Set sibling as an active item
const activateSibling = ($sibling) => {
  // Find anchor
  const $siblingButton = $sibling.querySelector('button')

  // Unset global active element
  $activeElem = false

  // Focus and click on current
  $siblingButton.focus()
  $siblingButton.click()
}

// Set click events on anchors
const setClicks = ($elems, $parent) => {
  $elems.forEach(($elem, i) => {
    // Find anchor
    const $button = $elem.querySelector('button')

    $button.addEventListener('click', (e) => {
      // Set active item on click
      activateElem($elems, $parent, $elem, $button, $elems.length, i)
    })
  })
}

// Set keyboard events
const setKeyboardEvents = () => {
  document.addEventListener('keydown', (e) => {
    // Take action only if global active element exists
    if ($activeElem) {
      // If key is "escape", emulate the click on the global active element
      if (e.code === 'Escape') {
        $activeElem.click()
      }

      // If key is "left arrow", activate the previous sibling
      if (e.code === 'ArrowLeft') {
        const $previousSibling = $activeElem.parentNode.previousElementSibling

        if ($previousSibling) {
          activateSibling($previousSibling)
        }
      }

      // If key is "right arrow", activate the next sibling
      if (e.code === 'ArrowRight') {
        const $nextSibling = $activeElem.parentNode.nextElementSibling

        if ($nextSibling) {
          activateSibling($nextSibling)
        }
      }
    }
  })
}

// Set resize events
const setResizeEvents = ($elems, $parent) => {
  window.addEventListener('resize', () => {
    // Set data attributes for calculations
    setDataAttrs($elems, $parent)
    // Deactivate grid items
    deactiveElems($elems, $parent)
  })
}

// If the gallery element exists, start the functionality
if ($grid) {
  // Find all list items
  const $items = $grid.querySelectorAll('li')

  // If there are list items, run operations
  if ($items.length) {
    getTimeouts($items)
    setDataAttrs($items, $grid)
    setClicks($items, $grid)
    setKeyboardEvents()
    setResizeEvents($items, $grid)
  }
}
