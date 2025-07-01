const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Ask permission for notification
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        console.log("Notification allowed ✅");
      }
    });
  }
}

// Show a custom notification
function notifyRonak(message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("📣 Hey Ronak!", {
      body: message,
      icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
    });
  }
}

// Load saved progress and attach event listeners
window.onload = function() {
  requestNotificationPermission();
  checkboxes.forEach((checkbox, index) => {
    const saved = localStorage.getItem('task_' + index);
    checkbox.checked = saved === 'true';

    checkbox.addEventListener("change", () => {
      saveProgress();
      if (checkbox.checked) {
        notifyRonak("Nice! Task complete ✅");
      } else {
        notifyRonak("Task un-checked. Keep going!");
      }
    });
  });
};

function saveProgress() {
  checkboxes.forEach((checkbox, index) => {
    localStorage.setItem('task_' + index, checkbox.checked);
  });
}
