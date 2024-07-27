'use strict'

document.addEventListener('DOMContentLoaded', () => {
  // Open and close the mobile menu
  const menuToggle = document.getElementById('menuToggle')
  const headerMobile = document.querySelector('.header__mobile')

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active')
    headerMobile.classList.toggle('active')
  })

  const dropdownToggles = document.querySelectorAll(
    '.header__mobile__nav__dropdown__toggle'
  )
  const dropdownLinksContainers = document.querySelectorAll(
    '.header__mobile__nav__dropdown__links'
  )

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const dropdownLinks = toggle.nextElementSibling
      const isOpen = dropdownLinks.classList.contains('active')

      // Close all other dropdowns
      dropdownLinksContainers.forEach((container) => {
        if (container !== dropdownLinks) {
          container.classList.remove('active')
          container.style.maxHeight = '0'
        }
      })

      // Toggle the active class
      if (isOpen) {
        dropdownLinks.classList.remove('active')
        dropdownLinks.style.maxHeight = '0'
        toggle.classList.remove('active')
      } else {
        dropdownLinks.classList.add('active')
        dropdownLinks.style.maxHeight = `${dropdownLinks.scrollHeight}px`
        toggle.classList.add('active')
      }
    })
  })

  const dropdowns = document.querySelectorAll('.header__desktop__nav__dropdown')
  const dropdownBg = document.querySelector('.header__dropdown__bg')

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      // Prevent the click event from bubbling up to the document
      event.stopPropagation()

      // Close all dropdowns except the one that was clicked
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          const otherDropdownContent =
            otherDropdown.querySelector('.dropdown-content')
          const otherDropdownLine = otherDropdown.querySelector(
            '.header__desktop__dropdown__nav__line'
          )
          otherDropdownContent.style.display = 'none'
          otherDropdownLine.classList.remove('active')
        }
      })

      // Toggle visibility of the clicked dropdown's content
      const dropdownContent = dropdown.querySelector('.dropdown-content')
      const dropdownLine = dropdown.querySelector(
        '.header__desktop__dropdown__nav__line'
      )
      const isVisible = dropdownContent.style.display === 'flex'

      dropdownContent.style.display = isVisible ? 'none' : 'flex'
      dropdownLine.classList.toggle('active', !isVisible)

      // Show or hide the dropdown background
      dropdownBg.style.display = isVisible ? 'none' : 'block'
    })
  })

  // Close all dropdowns and hide the dropdown background when clicking outside of them
  document.addEventListener('click', () => {
    dropdowns.forEach((dropdown) => {
      dropdown.querySelector('.dropdown-content').style.display = 'none'
      dropdown
        .querySelector('.header__desktop__dropdown__nav__line')
        .classList.remove('active')
    })

    // Hide the dropdown background
    dropdownBg.style.display = 'none'
  })
})
