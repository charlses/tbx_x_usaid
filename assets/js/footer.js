document.addEventListener('DOMContentLoaded', () => {
  const footerDropdownToggles = document.querySelectorAll(
    '.footer__mobile__nav__dropdown__toggle'
  )

  const footerDropdownLinksContainers = document.querySelectorAll(
    '.footer__mobile__nav__dropdown__links'
  )

  footerDropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const dropdownLinks = toggle.nextElementSibling
      const isOpen = dropdownLinks.classList.contains('active')

      // Close all other dropdowns
      footerDropdownLinksContainers.forEach((container) => {
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
})
