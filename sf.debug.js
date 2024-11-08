(() => {
  /**
   * SFP Debugger v. 0.0.0 👇
   */

  // Screensize guard
  if (window.innerWidth < 992) return;

  // Values
  const isWized = location.host == 'server.wized.com';
  const isWebflow = location.host.endsWith('.webflow.io');

  // Guard
  if (!isWized && !isWebflow) return;

  /**
   * Core functionality 👇
   */

  window.StudioForm = window.StudioForm || [];
  window.StudioForm.push(sfpMemory);

  function sfpMemory() {
    // Values
    const jsFileName = 'sfp-memory-js';
    const swapLabelStr = 'sfp-swap-label-default-value';
    const sfEventPrefix = StudioForm.config.eventPrefix;

    // Loop
    StudioForm.forEach(sf => {
      // Elements
      const elements = sf.elements;
      const mask = elements.mask;
      const storageName = jsFileName + '-' + sf.name;
      const storage =
        document.body.getAttribute('sfp-memory-local-storage') == 'true'
          ? localStorage
          : sessionStorage;

      // Guard
      if (mask.getAttribute(jsFileName)) return;
      else mask.setAttribute(jsFileName, '');

      // Initiate
      const ls = storage.getItem(storageName);
      const lsr = storage.getItem(storageName + '-record');
      if (ls && lsr) sfpMemoryWrite(sf, JSON.parse(ls), JSON.parse(lsr));

      // Event listener
      ['change', sfEventPrefix + 'transition'].forEach(str =>
        mask.addEventListener(str, async () => {
          // NEW DEBUGGER
          let isOn = localStorage.getItem('debugMode') == 'true';
          if (!isOn) return;

          // Values
          const data = sf.data();

          // Loop
          const promises = Object.keys(data).map(async key => {
            // Values
            const val = data[key];
            const files = [];

            // Logic
            if (val instanceof File) files.push(val);
            if (Array.isArray(val) && val[0] instanceof File)
              val.forEach(file => files.push(file));

            // IndexedDB write
            const filePromises = files.map(async (file, index) => {
              // Values
              const iDBKey = '__SFP_FILE__' + (await iDBwrite(file));

              // Logic
              if (files.length > 1) data[key][index] = iDBKey;
              else data[key] = iDBKey;
            });

            await Promise.all(filePromises);
          });

          await Promise.all(promises);

          // Save
          storage.setItem(storageName, JSON.stringify(data));
          storage.setItem(storageName + '-record', JSON.stringify(sf.record));
        })
      );

      // IndexDB function
      async function iDBwrite(file) {
        // Open
        const db = await sfpMemoryOpenDB(storageName);

        // Create a transaction
        const transaction = db.transaction(['files'], 'readwrite');
        const objectStore = transaction.objectStore('files');

        // Generate file
        const uuid = file.name + Date.now();
        const fileData = {
          id: uuid,
          data: file,
        };

        // Create a Promise
        return new Promise((resolve, reject) => {
          // Store the file in IndexedDB
          const request = objectStore.put(fileData);

          // Close
          request.onsuccess = function () {
            db.close();
            resolve(uuid);
          };

          // Log the error
          request.onerror = function () {
            db.close();
            reject(new Error('Error storing file'));
          };
        });
      }
    });
  }

  function sfpMemoryOpenDB(storageName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(storageName, 1);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        db.createObjectStore('files', { keyPath: 'id' });
      };

      request.onsuccess = function (event) {
        resolve(event.target.result);
      };

      request.onerror = function (event) {
        reject('Database error:', event.target.errorCode);
      };
    });
  }

  async function sfpMemoryWrite(sf, data, record = [0]) {
    // Helper
    function cascader(el, className, addClass) {
      // Values
      const parent = el.closest('[sf="cascader"], label');
      const arr = [parent || el];
      arr[0].querySelectorAll('*').forEach(node => arr.push(node));

      // Classlist logic
      arr.forEach(el =>
        el.classList[addClass ? 'add' : 'remove'](sfClassPrefix + className)
      );
    }

    function getAttributeOr(element, ...strings) {
      // Values
      let returnVal = null;

      // Loop
      strings.every(str => {
        // Values
        const val = element.getAttribute(str);

        // Logic
        if (val) {
          returnVal = val;
          return false;
        }

        // Default
        return true;
      });

      // Return
      return returnVal;
    }

    function getNodeKey(node) {
      return (
        getAttributeOr(node, 'data-name', 'name', 'id', 'class', 'type') ||
        node.tagName
      ).replace(/[?&!'()*]/g, '_');
    }

    // Function to read a file from IndexedDB by its ID
    async function iDBread(fileId) {
      // Open the IndexedDB
      const db = await sfpMemoryOpenDB(storageName);

      // Create a transaction to access the 'files' object store with read-only permissions
      const transaction = db.transaction(['files'], 'readonly');
      const objectStore = transaction.objectStore('files');

      // Create a Promise to handle the read operation
      return new Promise((resolve, reject) => {
        // Get the file from IndexedDB by its ID
        const request = objectStore.get(fileId);

        request.onsuccess = () => {
          // Close the database connection and resolve with the file data
          db.close();
          resolve(request.result);
        };

        request.onerror = () => {
          // Close the database connection and reject with an error
          db.close();
          reject(new Error('Error retrieving file'));
        };
      });
    }

    // Test delay
    await new Promise(resolve => setTimeout(resolve, 10));

    // Values
    const jsFileName = 'sfp-memory-js';
    const swapLabelStr = 'sfp-swap-label-default-value';
    const sfClassPrefix = StudioForm.config.comboClassPrefix;
    const sfEventPrefix = StudioForm.config.eventPrefix;

    // Elements
    const elements = sf.elements;
    const mask = elements.mask;
    const storageName = jsFileName + '-' + sf.name;
    const storage =
      document.body.getAttribute('sfp-memory-local-storage') == 'true'
        ? localStorage
        : sessionStorage;

    // Loop
    const arr = [];
    mask
      .querySelectorAll('input, textarea, select')
      .forEach(node => arr.push(node));
    const promises = arr.map(async node => {
      // Values
      const key = getNodeKey(node);
      const val = data[key];
      const isArr = Array.isArray(val);

      // Others cases
      if (!['radio', 'checkbox', 'file'].includes(node.type)) {
        // Default case
        node.value = val ? val : '';
        if (val)
          node.dispatchEvent(
            new Event('input', {
              bubbles: true,
            })
          );
        if (!val) cascader(node, 'valid', false);

        // Skip code below
        return;
      }

      // File case
      if (node.type == 'file') {
        // Guard
        if (!val) {
          clearFile(node, key);
          return;
        }

        // Values
        const iDBKeyPrefix = '__SFP_FILE__';
        if (!isArr && val.startsWith(iDBKeyPrefix)) {
          const res = await iDBread(val.replace(iDBKeyPrefix, ''));
          attachFile(node, res.data, key);
        }
      }

      // Radio case
      if (node.type == 'radio') {
        // Values
        let found = node.value == val;

        node.checked = found;
        cascader(node, 'checked', found);
      }

      // Checkbox case
      if (node.type == 'checkbox') {
        // Values
        const sfValue = node.getAttribute('sf-value');

        // Single checkbox
        if (!sfValue) {
          node.value = val ? val : '';
          node.checked = node.value ? true : false;
          cascader(node, 'checked', node.checked);
          return;
        }

        // Group checkboxes
        const otherCheckboxes = mask.querySelectorAll(
          `input[type="checkbox"][name="${node.name}"]`
        );

        // Values
        const arr = isArr ? val : [val];
        let found = false;
        let foundSfValues = [];
        if (val)
          arr.forEach(v => {
            otherCheckboxes.forEach(cb => {
              let otherSfValue = cb.getAttribute('sf-value');
              if (v == otherSfValue) {
                foundSfValues.push(otherSfValue);
                found = true;
              }
            });
          });

        // Requirements loop
        otherCheckboxes.forEach(cb => {
          cb.required = !found;
        });

        // Not found reset
        if (!found) node.value = '';

        // Other edgecase
        if (foundSfValues.includes(sfValue) && sfValue == 'Other') {
          node.click();
          return;
        }

        // That checkbox state
        if (foundSfValues.includes(sfValue)) {
          node.value = sfValue;
        }
        node.checked = node.value ? true : false;
        cascader(node, 'checked', node.checked);
      }
    });

    // Move
    sf.record = record;

    // Await
    await Promise.all(promises);

    // Dispatch event
    mask.dispatchEvent(new CustomEvent('change'));
    mask.dispatchEvent(new CustomEvent(sfEventPrefix + 'transition'));

    // If helpers
    function clearFile(node, key) {
      // Add class
      cascader(node, 'attached', false);
      node.removeAttribute('sf-attached');

      // Overwrite sf storage
      delete sf.data.files[key];

      // Name edgecase
      const swapLabel = node
        .closest('label')
        ?.querySelector('[sf="swap-label"]');
      if (swapLabel?.hasAttribute(swapLabelStr)) {
        swapLabel.innerHTML = swapLabel.getAttribute(swapLabelStr);
      }

      node.value = '';

      // setTimeout(() => {
      //   mask.dispatchEvent(new CustomEvent('change'));
      // }, 10);
    }

    function attachFile(node, file, key) {
      // Add class
      cascader(node, 'attached', true);
      node.setAttribute('sf-attached', '');

      // Name edgecase
      const swapLabel = node
        .closest('label')
        ?.querySelector('[sf="swap-label"]');
      if (swapLabel) {
        if (!swapLabel.hasAttribute(swapLabelStr))
          swapLabel.setAttribute(swapLabelStr, swapLabel.innerHTML);

        swapLabel.innerHTML = file.name;
      }

      // Overwrite sf storage
      sf.data.files[key] = file;
    }

    // Save
    storage.setItem(storageName, JSON.stringify(data));
  }

  function resetStudioForms() {
    StudioForm.forEach(sf => sfpMemoryWrite(sf, {}));
  }

  /**
   * Controls styling & functionality 👇
   */

  // Create and style the main controls container
  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'studioFormDebugControls';
  controlsContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: auto;
    /* min-width: 515px; */
    background-color: #2c2c2c;
    border: 2px solid #555;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: stretch;
    cursor: grab;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    z-index: 1000;
    user-select: none;
`;

  // Vintage X button in top-left corner
  const closeButton = document.createElement('div');
  closeButton.style.cssText = `
    position: absolute;
    top: -10px;
    left: -10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 1001;
`;
  closeButton.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="10" stroke="#555" stroke-width="2" fill="#222"/>
        <line x1="8" y1="8" x2="16" y2="16" stroke="#ddd" stroke-width="2" stroke-linecap="round"/>
        <line x1="8" y1="16" x2="16" y2="8" stroke="#ddd" stroke-width="2" stroke-linecap="round"/>
    </svg>
`;
  closeButton.onclick = () => {
    controlsContainer.style.display = 'none';
  };
  controlsContainer.appendChild(closeButton);

  // Chamber 1: StudioForm Logo with link
  const studioFormLogo = document.createElement('img');
  studioFormLogo.src =
    'https://assets-global.website-files.com/6572be9cbc50e968d34e0ea0/6572e4b79c13b90bc1affe18_Final%20Logo2.png';
  studioFormLogo.alt = 'StudioForm Logo';
  studioFormLogo.style.cssText = `
    height: 24px;
    width: 24px;
`;

  // Create the link for StudioForm Logo
  const studioFormLink = document.createElement('a');
  studioFormLink.href = 'https://www.StudioForm.pro';
  studioFormLink.target = '_blank'; // Opens link in a new tab
  studioFormLink.appendChild(studioFormLogo);

  // Chamber 1 container with background color matching the logo color
  const chamber1 = document.createElement('div');
  chamber1.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom-left-radius: 8px;
    background-color: rgba(251, 79, 37, 0.1); /* Light background color based on the logo */
    backdrop-filter: blur(8px); /* Same blur effect for consistency */
    width: 56px; /* Uniform width with Chamber 2 */
`;

  // Append the StudioForm logo link to the chamber and add chamber to controls container
  chamber1.appendChild(studioFormLink);
  controlsContainer.appendChild(chamber1);

  // Chamber 2: Webflow Logo with link
  const webflowLogo = document.createElement('img');
  webflowLogo.src =
    'https://d3e54v103j8qbb.cloudfront.net/static/favicon_default.b10796b955.png';
  webflowLogo.alt = 'Webflow Logo';
  webflowLogo.style.cssText = `
  height: 24px;
  width: 24px;
`;

  // Create the link for Webflow Logo
  const webflowLink = document.createElement('a');
  webflowLink.href = 'https://www.webflow.com';
  webflowLink.target = '_blank'; // Opens link in a new tab
  webflowLink.appendChild(webflowLogo);

  // Chamber 2 container with 100% height, no border-radius, and a set width for uniformity
  const chamber2 = document.createElement('div');
  chamber2.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 2px solid rgb(85, 85, 85);
  background-color: rgba(0, 102, 255, 0.1); /* Light blue background based on logo color */
  backdrop-filter: blur(8px); /* Subtle blur effect */
  width: 58px; /* Uniform width for chambers 1, 2, 4, & 5 */
`;

  // If is Wized
  if (isWized) {
    // Change the logo's src to Wized's logo
    webflowLogo.src =
      'https://uploads-ssl.webflow.com/671a80027ac32417164a6026/6728ab2258ffc8edfb7f4590_wized-square-icon.svg';

    // Change the link href to Wized's website
    webflowLink.href = 'https://www.wized.com';

    // Update the color scheme based on Wized's branding (use #6e30f7 for the background)
    chamber2.style.backgroundColor = 'rgba(110, 48, 247, 0.1)'; // Light purple background based on #6e30f7
  }

  // Append the logo link to the chamber and add chamber to controls container
  chamber2.appendChild(webflowLink);
  controlsContainer.appendChild(chamber2);

  // Chamber 3: "Debugger" and "Memory Mode" Titles
  const debugMemoryTitle = document.createElement('div');
  debugMemoryTitle.innerHTML = `
    <div style="
        font-size: 13px;
        line-height: 15px;
        font-family: 'Brush Script MT', 'Pacifico', cursive;
        background: linear-gradient(45deg, rgb(251, 79, 37), #ff00cc, #3333ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 10px rgba(251, 79, 37, 0.6), 0 0 10px rgba(51, 51, 255, 0.6);
        letter-spacing: 1px;
        margin-bottom: 0px; /* Tighter margin for closer spacing */
    ">Debugger</div>
    <div style="
        font-size: 16px;
        font-family: 'Impact', 'Futura', sans-serif;
        font-weight: bold;
        color: #ddd;
        letter-spacing: 0.5px;
        line-height: 20px;
    ">Memory Mode</div>
`;

  const chamber3 = document.createElement('div');
  chamber3.style.cssText = `
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 2px solid rgb(85, 85, 85);
    border-right: 2px solid rgb(85, 85, 85);
`;

  chamber3.appendChild(debugMemoryTitle);
  controlsContainer.appendChild(chamber3);

  // Chamber 4: On/Off Toggle Button
  let isOn = localStorage.getItem('debugMode') === 'true'; // Get the saved state from localStorage
  let isLoaded = false; // Initially, StudioForm is not loaded

  const chamber4 = document.createElement('div');
  chamber4.style.cssText = `
  display: flex;
  width: 58px; /* Keeping original width */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Impact', 'Futura', sans-serif; /* Updated font */
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  padding: 5px;
  border-right: 2px solid rgb(85, 85, 85); /* Keeping original right border */
  text-align: center;
  position: relative; /* To position the shadow */
`;

  const updateOnOffButton = () => {
    if (!isLoaded) return;

    // Update the button text and colors based on the state
    chamber4.innerText = isOn ? 'ON' : 'OFF';

    // Apply greenish gradient text when ON, red gradient text when OFF
    if (isOn) {
      chamber4.style.color = 'transparent';
      chamber4.style.backgroundClip = 'text';
      chamber4.style.webkitBackgroundClip = 'text'; // For cross-browser compatibility
      chamber4.style.backgroundImage =
        'linear-gradient(to left, #4CAF50, #2ECC71)'; // Smooth gradient for text
      chamber4.style.boxShadow = 'inset 0 0 10px rgba(39, 174, 96, 0.8)'; // Inward greenish glow
    } else {
      chamber4.style.color = 'transparent';
      chamber4.style.backgroundClip = 'text';
      chamber4.style.webkitBackgroundClip = 'text'; // For cross-browser compatibility
      chamber4.style.backgroundImage =
        'linear-gradient(to left, #e74c3c, #c0392b)'; // Smooth gradient for text
      chamber4.style.boxShadow = 'inset 0 0 10px rgba(231, 76, 60, 0.8)'; // Inward red glow
    }
  };

  chamber4.onclick = () => {
    if (isLoaded) {
      isOn = !isOn; // Toggle the state
      localStorage.setItem('debugMode', isOn); // Save the new state in localStorage
      updateOnOffButton();
    }
  };

  updateOnOffButton(); // Initialize button based on saved state

  controlsContainer.appendChild(chamber4);

  // Chamber 5: Refresh Button
  const refreshButton = document.createElement('button');
  refreshButton.innerHTML = '↻'; // Only the refresh icon
  refreshButton.style.cssText = `
    margin: 0;
    padding: 5px;
    background-color: #333;
    border: 2px solid #888;
    border-radius: 50%; /* Rounded button for a more retro look */
    color: #FFF;
    font-family: 'Courier New', monospace;
    font-size: 20px; /* Larger, retro-style icon */
    cursor: pointer;
    width: 40px; /* Consistent with the width of the other chambers */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Shadow for a more old-school, retro feel */
    transition: transform 0.2s ease, background-color 0.2s ease; /* Smooth transition for hover effects */
`;

  // Hover effect: Slight rotation for the "retro" feel
  refreshButton.onmouseenter = () => {
    refreshButton.style.transform = 'rotate(10deg)'; // Slight rotation on hover
    refreshButton.style.backgroundColor = '#444'; // Darker background on hover
  };
  refreshButton.onmouseleave = () => {
    refreshButton.style.transform = 'rotate(0deg)'; // Reset rotation
    refreshButton.style.backgroundColor = '#333'; // Reset background
  };

  // Action for button click (you can replace this with actual refresh functionality later)
  refreshButton.onclick = () => {
    resetStudioForms();
  };

  // Chamber 5 container with matching width and other vintage-style settings
  const chamber5 = document.createElement('div');
  chamber5.style.cssText = `
    padding: 0; /* Remove any padding */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px; /* Match the width of other chambers */
`;

  // Append the refresh button to chamber5 and chamber5 to the controls container
  chamber5.appendChild(refreshButton);
  controlsContainer.appendChild(chamber5);

  // Function to show retro spinner while waiting for StudioForm to load
  const showSpinner = () => {
    const parent = document.createElement('div');
    parent.style.cssText = `
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 8px;
      border-radius: 50%;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 24px;
        height: 24px;
        border: 2px solid rgb(136, 136, 136);
        border-top: 2px solid #fff; /* Darker top border to create spinning contrast */
        border-radius: 50%; /* Circular spinner for a retro feel */
        animation: spin 1s linear infinite; /* Smooth spin animation */
        background-color: transparent; /* No background, just the border effect */
    `;

    parent.appendChild(spinner);
    chamber4.appendChild(parent);
  };

  // Retro spinner animation
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
  document.head.appendChild(styleSheet);

  // Simulate StudioForm loading and set up a callback
  window.StudioForm = window.StudioForm || [];
  window.StudioForm.push(() => {
    // SF DONE LOADING
    isLoaded = true;
    updateOnOffButton(); // Update the button to show the correct state after loading
  });

  // Show spinner while waiting for StudioForm to load
  if (!isLoaded) {
    showSpinner();
  }

  // Append controls to the document body
  document.body.appendChild(controlsContainer);

  // Function to ensure the element is within 50% view boundaries
  function ensureInView(element) {
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = rect.left;
    let top = rect.top;

    // Constrain position within 50% of its width and height outside viewport
    const maxLeft = windowWidth - rect.width * 0.5;
    const maxTop = windowHeight - rect.height * 0.5;

    if (rect.right < rect.width * 0.5) left = 0;
    if (rect.bottom < rect.height * 0.5) top = 0;
    if (rect.left > maxLeft) left = maxLeft;
    if (rect.top > maxTop) top = maxTop;

    // Update style to ensure it's within partial bounds
    element.style.left = left + 'px';
    element.style.top = top + 'px';
    element.style.bottom = 'auto';
    element.style.right = 'auto';

    // Save the updated position
    sessionStorage.setItem('controlsPosition', JSON.stringify({ left, top }));
  }

  // Set position based on session storage, or use default
  const savedPosition = JSON.parse(sessionStorage.getItem('controlsPosition'));
  if (savedPosition) {
    controlsContainer.style.left = savedPosition.left + 'px';
    controlsContainer.style.top = savedPosition.top + 'px';
    controlsContainer.style.bottom = 'auto';
    controlsContainer.style.right = 'auto';
    ensureInView(controlsContainer);
  }

  // Enable dragging functionality
  let isDragging = false;
  let offsetX, offsetY;

  controlsContainer.addEventListener('mousedown', e => {
    isDragging = true;
    controlsContainer.style.cursor = 'grabbing';
    offsetX = e.clientX - controlsContainer.getBoundingClientRect().left;
    offsetY = e.clientY - controlsContainer.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      const newLeft = e.clientX - offsetX;
      const newTop = e.clientY - offsetY;

      // Allow the element to go up to 50% of its width and height offscreen
      const maxLeft = window.innerWidth - controlsContainer.offsetWidth * 0.5;
      const maxTop = window.innerHeight - controlsContainer.offsetHeight * 0.5;

      controlsContainer.style.left =
        Math.min(
          Math.max(-controlsContainer.offsetWidth * 0.5, newLeft),
          maxLeft
        ) + 'px';
      controlsContainer.style.top =
        Math.min(
          Math.max(-controlsContainer.offsetHeight * 0.5, newTop),
          maxTop
        ) + 'px';
      controlsContainer.style.bottom = 'auto';
      controlsContainer.style.right = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      controlsContainer.style.cursor = 'grab';

      // Save the new position to sessionStorage
      const rect = controlsContainer.getBoundingClientRect();
      sessionStorage.setItem(
        'controlsPosition',
        JSON.stringify({
          left: rect.left,
          top: rect.top,
        })
      );
    }
  });
})();
