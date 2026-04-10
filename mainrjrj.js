// Diamonds data (first 3 items)
const diamondsItems = [
  {
    id: 1,
    title: "250",
    image: "https://99nightsforest.us/images/Diamonds.png",
  },
  {
    id: 2,
    title: "1400",
    image: "https://99nightsforest.us/images/Diamonds.png",
  },
  {
    id: 3,
    title: "2800",
    image: "https://99nightsforest.us/images/Diamonds.png",
  },
]

// Class data (next 3 items)
const classItems = [
   {
    id: 4,
    title: "Engineer",
    image: "https://99nightsforest.us/images/Engineer.png",
  },
   {
    id: 5,
    title: "Assassin",
    image: "https://99nightsforest.us/images/assassin.png",
  },
   {
    id: 6,
    title: "Necromancer",
    image: "https://99nightsforest.us/images/Necromaner.png",
  },
   {
    id: 7,
    title: "Cyborg",
    image: "https://99nightsforest.us/images/cyborg.png",
  },
   {
    id: 8,
    title: "Fire Bandit",
    image: "https://99nightsforest.us/images/firebandit.png",
  },
  {
    id: 9,
    title: "Vampire",
    image: "https://99nightsforest.us/images/Vampire.png",
  },
    {
    id: 10,
    title: "Big Game Hunter",
    image: "https://99nightsforest.us/images/biggamehunter.png",
  },
    {
    id: 11,
    title: "Pyromaniac",
    image: "https://99nightsforest.us/images/pyromaniac.png",
  },
    {
    id: 12,
    title: "Alien",
    image: "https://99nightsforest.us/images/alien.png",
  },
    {
    id: 13,
    title: "Bunny",
    image: "https://99nightsforest.us/images/Bunny.png",
  },
    {
    id: 14,
    title: "Egg Hunter",
    image: "https://99nightsforest.us/images/Egg Hunter.png",
  },
]

// Items data (next 3 items)
const itemsData = [
  {
    id: 15,
    title: "Basic Egg!",
    image: "https://99nightsforest.us/images/Basic Egg.png",
  },
  {
    id: 16,
    title: "Basketball Egg!",
    image: "https://99nightsforest.us/images/Basketball Egg.png",
  },
  {
    id: 17,
    title: "Chick Egg!",
    image: "https://99nightsforest.us/images/Chick Egg.png",
  },
   {
    id: 18,
    title: "Lightning Egg!",
    image: "https://99nightsforest.us/images/Lightning Egg.png",
  },
   {
    id: 19,
    title: "Cooked Egg!",
    image: "https://99nightsforest.us/images/Cooked Egg.png",
  },
   {
    id: 20,
    title: "Glowing Egg!",
    image: "https://99nightsforest.us/images/Glowing Egg.png",
  },
   {
    id: 21,
    title: "Volcanic Egg!",
    image: "https://99nightsforest.us/images/Volcanic Egg.png",
  },
   {
    id: 22,
    title: "Pelt Trader Egg!",
    image: "https://99nightsforest.us/images/Pelt Trader Egg.png",
  },
   {
    id: 23,
    title: "Frog Egg!",
    image: "https://99nightsforest.us/images/Frog Egg.png",
  },
   {
    id: 24,
    title: "Alien Egg!",
    image: "https://99nightsforest.us/images/Alien Egg.png",
  },
]

const allItems = [...diamondsItems, ...classItems, ...itemsData]

// DOM elements
const mainContent = document.getElementById("mainContent")
const usernameInput = document.getElementById("usernameInput")
const continueButton = document.getElementById("continueButton")
const errorMessage = document.getElementById("errorMessage")
const diamondsGrid = document.getElementById("diamondsGrid")
const classGrid = document.getElementById("classGrid")
const itemsGrid = document.getElementById("itemsGrid")
const verifyingModal = document.getElementById("verifyingModal")
const confirmationModal = document.getElementById("confirmationModal")
const sendingModal = document.getElementById("sendingModal")
const finalStepModal = document.getElementById("finalStepModal")
const confirmationText = document.getElementById("confirmationText")
const sendingText = document.getElementById("sendingText")
const selectedItemsContainer = document.getElementById("selectedItemsContainer")
const sendItemsButton = document.getElementById("sendItemsButton")
const verifyNowButton = document.getElementById("verifyNowButton")

// State
let selectedItems = []
/* Track selected items per section for new selection logic */
const selectedItemsPerSection = {
  diamonds: null,
  class: null,
  items: null,
}
let dotInterval

// Initialize
function init() {
  generateItemsForSection(diamondsItems, diamondsGrid)
  generateItemsForSection(classItems, classGrid)
  generateItemsForSection(itemsData, itemsGrid)

  // Add event listeners
  continueButton.addEventListener("click", handleContinue)
  sendItemsButton.addEventListener("click", handleSendItems)
  verifyNowButton.addEventListener("click", handleVerifyNow)

  // Start loading dots animation
  startDotsAnimation()
}

function generateItemsForSection(items, gridElement) {
  items.forEach((item) => {
    const itemElement = document.createElement("div")
    itemElement.className = "item"
    itemElement.innerHTML = `
            <div class="item-image" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="item-img">
                <div class="item-checkmark">
                    <svg class="checkmark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </div>
            <p class="item-title">${item.title}</p>
        `

    const itemImage = itemElement.querySelector(".item-image")
    itemImage.addEventListener("click", () => handleItemClick(item.id, itemImage))

    gridElement.appendChild(itemElement)
  })
}

// Handle item click
function handleItemClick(itemId, itemElement) {
  /* Updated selection logic to allow only 1 item per section */
  const item = allItems.find((item) => item.id === itemId)
  let sectionType = ""

  // Determine which section this item belongs to
  if (diamondsItems.find((i) => i.id === itemId)) {
    sectionType = "diamonds"
  } else if (classItems.find((i) => i.id === itemId)) {
    sectionType = "class"
  } else if (itemsData.find((i) => i.id === itemId)) {
    sectionType = "items"
  }

  // If this item is already selected, deselect it
  if (selectedItemsPerSection[sectionType] === itemId) {
    selectedItemsPerSection[sectionType] = null
    selectedItems = selectedItems.filter((id) => id !== itemId)
    itemElement.classList.remove("selected")

    // Clear error message
    if (errorMessage.style.display === "block") {
      errorMessage.style.display = "none"
    }
  } else {
    // If another item in this section is selected, deselect it first
    if (selectedItemsPerSection[sectionType] !== null) {
      const previouslySelected = document.querySelector(`[data-id="${selectedItemsPerSection[sectionType]}"]`)
      if (previouslySelected) {
        previouslySelected.classList.remove("selected")
      }
      selectedItems = selectedItems.filter((id) => id !== selectedItemsPerSection[sectionType])
    }

    // Select the new item
    selectedItemsPerSection[sectionType] = itemId
    selectedItems.push(itemId)
    itemElement.classList.add("selected")

    // Clear error message
    if (errorMessage.style.display === "block") {
      errorMessage.style.display = "none"
    }
  }
}

// Validate username
function validateUsername(username) {
  if (!username.trim()) {
    showError("Please enter a valid username.")
    return false
  }
  return true
}

// Show error
function showError(message) {
  const errorElement = document.getElementById("errorMessage")
  errorElement.textContent = message
  errorElement.style.display = "block"

  // Hide after 3 seconds
  setTimeout(() => {
    errorElement.style.display = "none"
  }, 3000)
}

// Handle continue button click
function handleContinue() {
  const username = usernameInput.value

  // Validate username
  if (!validateUsername(username)) {
    return
  }

  // Validate item selection
  if (selectedItems.length === 0) {
    showError("Please select at least 1 item")
    return
  }

  // Clear error
  errorMessage.style.display = "none"

  // Show verifying modal
  mainContent.classList.add("blur")
  verifyingModal.style.display = "flex"

  // After 3 seconds, show confirmation modal
  setTimeout(() => {
    verifyingModal.style.display = "none"

    // Update confirmation text
    confirmationText.textContent = `Would you like to send the items to @${username}?`

    // Generate selected items
    selectedItemsContainer.innerHTML = ""
    selectedItems.forEach((itemId) => {
      const item = allItems.find((item) => item.id === itemId)
      const selectedItemElement = document.createElement("div")
      selectedItemElement.className = "selected-item"
      selectedItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="selected-item-img">
            `
      selectedItemsContainer.appendChild(selectedItemElement)
    })

    confirmationModal.style.display = "flex"
  }, 3000) // 3 seconds
}

// Handle send items button click
function handleSendItems() {
  const username = usernameInput.value

  // Hide confirmation modal
  confirmationModal.style.display = "none"

  // Update sending text
  sendingText.textContent = `Sending items to @${username}`

  // Show sending modal
  sendingModal.style.display = "flex"

  // After 3 seconds, show final step modal
  setTimeout(() => {
    sendingModal.style.display = "none"
    finalStepModal.style.display = "flex"
  }, 3000) // 3 seconds
}

// Handle verify now button click
function handleVerifyNow() {
  const username = usernameInput.value

  // Here you would handle the verification process
  console.log("Verification requested for user:", username)
}

// Start loading dots animation
function startDotsAnimation() {
  const allDots = document.querySelectorAll(".dots")
  let dotCount = 1

  dotInterval = setInterval(() => {
    dotCount = dotCount < 3 ? dotCount + 1 : 1
    allDots.forEach((dots) => {
      dots.textContent = ".".repeat(dotCount)
    })
  }, 500)
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init)