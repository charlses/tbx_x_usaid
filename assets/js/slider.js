document
  .querySelectorAll(
    '.slider__offers__section, .slider__products__section, .slider__awards__section'
  )
  .forEach((section) => {
    const container = section.querySelector('.slider__container')
    const items = container.querySelectorAll('.slider__item')
    const prevBtn = section.querySelector('.slider__prev')
    const nextBtn = section.querySelector('.slider__next')
    const blueLine = section.querySelector('.slider__blue__line')
    const blueLineWrapper = section.querySelector(
      '.slider__blue__line__wrapper'
    )

    let isDragging = false
    let startX
    let scrollLeft

    const updateButtons = () => {
      prevBtn.disabled = container.scrollLeft === 0
      nextBtn.disabled =
        container.scrollLeft + container.clientWidth >= container.scrollWidth
    }

    const moveBlueLine = () => {
      const scrollPercentage =
        container.scrollLeft / (container.scrollWidth - container.clientWidth)
      blueLine.style.transform = `translateX(${
        scrollPercentage * (blueLineWrapper.clientWidth - blueLine.clientWidth)
      }px)`
    }

    const showItem = (direction) => {
      const itemWidth = items[0].offsetWidth + 20 // Including gap
      container.scrollBy({ left: itemWidth * direction, behavior: 'smooth' })
    }

    const startDrag = (e) => {
      isDragging = true
      startX = (e.pageX || e.touches[0].pageX) - container.offsetLeft
      scrollLeft = container.scrollLeft
      container.style.cursor = 'grabbing'
    }

    const stopDrag = () => {
      isDragging = false
      container.style.cursor = 'grab'
    }

    const duringDrag = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = (e.pageX || e.touches[0].pageX) - container.offsetLeft
      const walk = (x - startX) * 2 // Adjust scroll speed if necessary
      container.scrollLeft = scrollLeft - walk
      moveBlueLine()
    }

    const addSpringEffect = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      if (container.scrollLeft <= 0) {
        container.classList.add('spring-start')
        setTimeout(() => container.classList.remove('spring-start'), 150)
      } else if (container.scrollLeft >= maxScrollLeft) {
        container.classList.add('spring-end')
        setTimeout(() => container.classList.remove('spring-end'), 150)
      }
    }

    prevBtn.addEventListener('click', () => showItem(-1))
    nextBtn.addEventListener('click', () => showItem(1))

    container.addEventListener('scroll', () => {
      updateButtons()
      moveBlueLine()
      addSpringEffect()
    })

    container.addEventListener('mousedown', startDrag)
    container.addEventListener('mousemove', duringDrag)
    container.addEventListener('mouseup', stopDrag)
    container.addEventListener('mouseleave', stopDrag)

    // Add touch event listeners for mobile devices
    container.addEventListener('touchstart', startDrag)
    container.addEventListener('touchmove', duringDrag)
    container.addEventListener('touchend', stopDrag)

    document.addEventListener('DOMContentLoaded', () => {
      blueLine.style.width = `${
        (blueLineWrapper.clientWidth / container.scrollWidth) * 100
      }%`
      updateButtons()
      moveBlueLine()
    })
  })
