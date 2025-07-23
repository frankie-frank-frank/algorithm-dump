const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

let browserInstance;
let lastRuntime = new Date();

async function getBrowserInstance() {
    if (!browserInstance || !browserInstance.isConnected()) {
        await closeBrowser();
        console.log("Launching Browser");
        browserInstance = await puppeteer.launch({ 
          headless: false, 
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            '--disable-blink-features=AutomationControlled',
            '--window-size=1920,1080',
            '--start-maximized',
            '--display=:99'
          ],
          defaultViewport: null,
          ignoreHTTPSErrors: true 
        });
        const page = await browserInstance.newPage();
        await page.evaluateOnNewDocument(() => {
          Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
          });
          delete navigator.__proto__.webdriver;
        });
      }
      return browserInstance;
}

async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

async function Run(url, resolution) {
  lastRuntime = new Date();
  const browser = await getBrowserInstance();
  console.log("Browser Connected", browser.connected);
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(600000);

  if (resolution) {
    const [width, height] = resolution.split('x');
    console.log("Resolution", 'Width: ' + width + ', Height: ' + height + '');
    await page.setViewport({ width: +width, height: +height, deviceScaleFactor: 1 });
  }
  // await page.setJavaScriptEnabled(false);
  await page.goto(url);

  //await page.waitForNavigation();
  console.log("Waiting for idle network");


  await Promise.race([
    page.waitForNetworkIdle({
      idleTime: 5000
    }),
    new Promise(resolve => setTimeout(resolve, 10000))
  ]);

  // shadow root fix
  await page.evaluate(() => {
    function findAllShadowRoots(root = document.body) {
        const shadowRoots = [];
        function traverse(node) {
          // Check if the node has a shadow root
          if (node.shadowRoot) {
            node.shadowRoot.innerHTML.replace(/\\x3C!---->/g, "<!");
            shadowRoots.push(node.shadowRoot.innerHTML);
            // Recursively search within the shadow root
            traverse(node.shadowRoot);
          }
          // Check child nodes
          const children = node.children || node.childNodes;
          for (let child of children) {
            traverse(child);
          }
        }
        traverse(root);
        return shadowRoots;
    }
    // Usage
    const allShadowRoots = findAllShadowRoots();
    return {allShadowRoots}
  });
  
  // modal suppression
  await page.evaluate(() => {
    function hideElementsIfLargeModal() {
        console.log("showing only modals.....");
        const modalEle = [];
        const onScreenModal = [];
        const elements = document.body.querySelectorAll("body *");
        document.body.style.overflowY = "scroll";
        const iframeRect = document.documentElement.getBoundingClientRect();
        const documentHeight = document.documentElement.scrollHeight;
        console.log("====================================");
        console.log(iframeRect, documentHeight);
        console.log("====================================");
        for (let i = 0; i < elements.length; i += 1) {
          const element = elements[i];
          const computedStyle = window.getComputedStyle(element);
          const opacity = parseFloat(computedStyle.getPropertyValue("opacity"));
          const visibility = computedStyle.getPropertyValue("visibility");
          const display = computedStyle.getPropertyValue("display");
          const zIndex = parseInt(computedStyle.getPropertyValue("z-index"), 10);
          const position = computedStyle.getPropertyValue("position");
          if (element.shadowRoot) {
            detectShadowDomElements(element, iframeRect, documentHeight);
          }
          if (element.tagName.toLowerCase() === "iframe") {
            detectIframe(element, element.parentNode, iframeRect, documentHeight);
          }
          if (hasBeforePseudoElementWithProperties(element)) {
            console.log("====================================");
            console.log("hasBeforePseudoElementWithProperties ", element);
            console.log("====================================");
            element.style.setProperty("display", "none", "important");
          }
          if (conditions(opacity, visibility, display, zIndex, position, element)) {
            modalEle.push(element);
          }
        }
        if (modalEle) {
          modalEle.forEach((element) => {
            if (
              !importantModals(element, iframeRect) &&
              !isSmallHeader(element) &&
              !isLeftModal(element, iframeRect?.width / 3) &&
              !smallModalIsOkay(element) &&
              !hasNoChild(element) &&
              isInRange(element, (iframeRect?.width || 0) + 10, documentHeight) &&
              heightMustBeMore(element)
            ) {
              onScreenModal.push(element);
            }
          });
          if (onScreenModal.length) {
            onScreenModal.forEach((modal) => {
              if (bottomAddToCart(modal, iframeRect)) {
                console.log("we are here");
              } else {
                nextElementSiblingIsOverlay(modal);
                console.log("====================================");
                console.log("hideElementsIfLargeModal ", modal);
                console.log("====================================");
                modal.style.setProperty("display", "none", "important");
              }
            });
          }
        }
      }
      function conditions(opacity, visibility, display, zIndex, position, element) {
        return (
          zIndex > 0 &&
          display !== "none" &&
          visibility !== "hidden" &&
          opacity > 0 &&
          !["button"].includes(element.tagName.toLowerCase()) &&
          position === "fixed"
        );
      }
      function hasBeforePseudoElementWithProperties(element) {
        const computedStyle = window.getComputedStyle(element, ":before");
        const contentPropertyValue = computedStyle.getPropertyValue("content");
        // Check if ::before pseudo-element exists and has the desired properties
        return (
          contentPropertyValue !== "none" &&
          computedStyle.getPropertyValue("position") === "fixed" &&
          computedStyle.getPropertyValue("display") !== "none" &&
          parseInt(computedStyle.getPropertyValue("z-index")) > 0 &&
          computedStyle.getPropertyValue("visibility") !== "hidden" &&
          parseFloat(computedStyle.getPropertyValue("opacity")) > 0 &&
          !["button"].includes(element.tagName.toLowerCase())
        );
      }
      function bottomAddToCart(element, iframeRect) {
        console.log("bottomAddToCart");
        const ele = element.getBoundingClientRect();
        if (
          ele.bottom <= window.innerHeight + 50 &&
          ele.width <= iframeRect.width + 5 &&
          ele.height <= window.innerHeight / 3
        ) {
          const subChildren = getAllChildren(element);
          console.log({ subChildren });
          return subChildren.some((child) => {
            return containsAddOrCartButtonText(child) || hasCursorPointer(child);
          });
        }
        return false;
      }
      function hasCursorPointer(element) {
        const styles = window.getComputedStyle(element);
        return styles.getPropertyValue("cursor") === "pointer";
      }
      function containsAddOrCartButtonText(element) {
        return (
          element.tagName.toLowerCase() === "button" &&
          (element.innerText.toLowerCase().includes("add") ||
            element.innerText.toLowerCase().includes("cart") ||
            element.innerText.toLowerCase().includes("preorder") ||
            element.innerText.toLowerCase().includes("bag"))
        );
      }
      function nextElementSiblingIsOverlay(element) {
        const overlay = element.nextElementSibling;
        if (overlay instanceof Element) {
          const computedStyle = window.getComputedStyle(overlay);
          const opacity = parseFloat(computedStyle.getPropertyValue("opacity"));
          const visibility = computedStyle.getPropertyValue("visibility");
          const display = computedStyle.getPropertyValue("display");
          const zIndex = parseInt(computedStyle.getPropertyValue("z-index"), 10);
          const position = computedStyle.getPropertyValue("position");
          console.log("====================================");
          console.log("nextElementSiblingIsOverlay up ", overlay);
          console.log("====================================");
          console.log({
            opacity,
            visibility,
            display,
            zIndex,
            position,
            overlay: overlay.tagName.toLowerCase(),
          });
          if (conditions(opacity, visibility, display, zIndex, position, overlay)) {
            console.log("====================================");
            console.log("nextElementSiblingIsOverlay ", overlay);
            console.log("====================================");
            overlay.style.setProperty("display", "none", "important");
          }
        }
      }
      function hasNoChild(element) {
        return element.childElementCount === 0;
      }
      function smallModalIsOkay(element) {
        const ele = element.getBoundingClientRect();
        if (ele.width <= 100 && ele.height <= 100) {
          return true;
        }
        return false;
      }
      function isLeftModal(element, width) {
        const ele = element.getBoundingClientRect();
        if (
          ele.left < 100 &&
          ele.width <= width &&
          ele.height >= window.innerHeight / 2
        ) {
          return true;
        }
        return false;
      }
      function importantModals(element, iframeRect) {
        const ele = element.getBoundingClientRect();
        if (
          ele.top < 100 &&
          ele.width <= iframeRect.width + 5 &&
          ele.height <= window.innerHeight / 3
        ) {
          return true;
        }
        return false;
      }
      function isSmallHeader(element) {
        const ele = element.getBoundingClientRect();
        if (ele.top < 100 && ele.height <= 50) {
          return true;
        }
        return false;
      }
      function heightMustBeMore(element) {
        const ele = element.getBoundingClientRect();
        return ele.height > 5;
      }
      function isInRange(element, width, height) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= -40 &&
          rect.left >= -10 &&
          rect.right <= width &&
          rect.height <= height + 10
        );
      }
      function detectShadowDomElements(element, iframeRect, documentHeight) {
        const shadowRoot = element.shadowRoot;
        const hostElement = shadowRoot.host;
        const subChildren = getAllChildren(shadowRoot);
        subChildren.forEach((child) => {
          if (child instanceof Element) {
            const computedStyle = window.getComputedStyle(child);
            const opacity = parseFloat(computedStyle.getPropertyValue("opacity"));
            const visibility = computedStyle.getPropertyValue("visibility");
            const display = computedStyle.getPropertyValue("display");
            const zIndex = parseInt(computedStyle.getPropertyValue("z-index"), 10);
            const position = computedStyle.getPropertyValue("position");
            if (
              (zIndex > 0 || zIndex === "auto") &&
              display !== "none" &&
              visibility !== "hidden" &&
              opacity > 0 &&
              position === "fixed" &&
              !["button"].includes(child.tagName.toLowerCase()) &&
              isInRange(child, iframeRect.width + 10, documentHeight)
              // heightMustBeMore(child)
            ) {
              console.log({
                opacity,
                visibility,
                display,
                zIndex,
                position,
                overlay: child.tagName.toLowerCase(),
              });
              console.log("====================================");
              console.log("detectShadowDomElements ", hostElement);
              console.log("====================================");
              hostElement.style.setProperty("display", "none", "important");
            }
          }
        });
      }
      function detectIframe(element, parentNode, iframeRect, documentHeight) {
        if (element.contentDocument) {
          const parentElement = element;
          const iframeChildren = element.contentDocument.body.children;
          const iframeNoOfChildren = iframeChildren?.length;
          const subChildren = getAllChildren(element.contentDocument.body);
          subChildren.forEach((child) => {
            const computedStyle = window.getComputedStyle(child);
            const opacity = parseFloat(computedStyle.getPropertyValue("opacity"));
            const visibility = computedStyle.getPropertyValue("visibility");
            const display = computedStyle.getPropertyValue("display");
            const zIndex = parseInt(computedStyle.getPropertyValue("z-index"), 10);
            const position = computedStyle.getPropertyValue("position");
            if (
              (zIndex > 0 || isNaN(zIndex)) &&
              display !== "none" &&
              visibility !== "hidden" &&
              opacity > 0 &&
              position === "fixed" &&
              !["button"].includes(child.tagName.toLowerCase()) &&
              isInRange(child, iframeRect.width + 10, documentHeight) &&
              heightMustBeMore(child)
            ) {
              if (iframeNoOfChildren === 1 && parentNode) {
                console.log("====================================");
                console.log("detectIframe ", parentNode);
                console.log("====================================");
                parentNode?.style.setProperty("display", "none", "important");
              }
              console.log("====================================");
              console.log("detectIframe ", parentElement);
              console.log("====================================");
              parentElement?.style.setProperty("display", "none", "important");
            }
          });
        }
      }
      function getAllChildren(element) {
        let children = [];
        children.push(element);
        for (let i = 0; i < element.children.length; i += 1) {
          children = children.concat(getAllChildren(element.children[i]));
        }
        return children;
      }
      hideElementsIfLargeModal()
  })

  // remove image white spaces
  await page.evaluate(() => {
    const imgElements = document.querySelectorAll('img, picture source, picture img');

    const divElements = document.querySelectorAll('div');
    let divBgElements = Array.from(divElements).filter(element => {
        let bgSet = element.getAttribute('data-bgset');
        return bgSet !== undefined && bgSet !== 'none'
    });
    
    for(let element of divBgElements){
      if(element.hasAttribute('data-bgset')){
        let src = element.getAttribute('data-bgset');
        let trimmedSrc = src
        .split(',')
        .map(part => part.trim().replace(/\\s+/g, ' '))
        .join(', ');
        element.setAttribute('data-bgset', trimmedSrc);
      }
    }

    for(let image of imgElements) {
      if (image.hasAttribute('src')) {
        let src = image.getAttribute('src');
        let trimmedSrc = src
        .split(',')
        .map(part => part.trim().replace(/\\s+/g, ' '))
        .join(', ');
        image.setAttribute('src', trimmedSrc);
      }

      if (image.hasAttribute('srcset')) {
        let srcset = image.getAttribute('srcset');
        let trimmedSrcset = srcset
        .split(',')
        .map(part => part.trim().replace(/\\s+/g, ' '))
        .join(', ');
        image.setAttribute('srcset', trimmedSrcset);
      }
      if (image.hasAttribute('data-srcset')) {
        let dataSrcset = image.getAttribute('data-srcset');
        let trimmedSrcset = dataSrcset
        .split(',')
        .map(part => part.trim().replace(/\\s+/g, ' '))
        .join(', ');
        image.setAttribute('data-srcset', trimmedSrcset);
      }
    }
  })

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  if (10 * viewportHeight > scrollHeight) {
    console.log("Scrolling down...");
    for (let i = 0; i < scrollHeight; i += 100) {
      await page.evaluate((scrollPos) => {
        window.scrollTo(0, scrollPos);
      }, i);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Pause for 100ms
    }

    console.log("Scrolling up...");
    for (let i = scrollHeight - 100; i > 0; i -= 100) {
      await page.evaluate((scrollPos) => {
        window.scrollTo(0, scrollPos);
      }, i);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Pause for 100ms
    }
  }

  let getInitialMutation = function () {
    console.log("Evaluating .... ");
    return page.evaluate(() => {
      function NodeMap() {
        this.nodes = new Map();
      }

      NodeMap.prototype.set = function (node, value) {
        this.nodes.set(node, value);
      };

      NodeMap.prototype.get = function (node) {
        return this.nodes.get(node);
      };

      NodeMap.prototype.delete = function (node) {
        this.nodes.delete(node);
      };

      NodeMap.prototype.has = function (node) {
        return this.nodes.has(node);
      };

      NodeMap.prototype.keys = function () {
        return Array.from(this.nodes.keys());
      };

      NodeMap.prototype.values = function () {
        return Array.from(this.nodes.values());
      };

      NodeMap.prototype.forEach = function (callback) {
        this.nodes.forEach((value, key) => {
          callback(value, key);
        });
      };

      function MutationSummary(config) {
        this.rootNode = config.rootNode;
        this.callback = config.callback;
        this.queries = config.queries || [{ all: true }];
        this.observer = new MutationObserver(this.handleMutations.bind(this));
        this.observe();
      }

      MutationSummary.prototype.observe = function () {
        const options = {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true,
        };
        this.observer.observe(this.rootNode, options);
      };

      MutationSummary.prototype.handleMutations = function (mutations) {
        const summaries = this.summarize(mutations);
        if (summaries.length > 0) {
          this.callback(summaries);
        }
      };

      MutationSummary.prototype.summarize = function (mutations) {
        const summary = {
          added: [],
          removed: [],
          reparented: [],
          reordered: [],
          attributeChanged: {},
          characterDataChanged: [],
        };

        mutations.forEach((mutation) => {
          switch (mutation.type) {
            case "childList":
              mutation.addedNodes.forEach((node) => summary.added.push(node));
              mutation.removedNodes.forEach((node) =>
                summary.removed.push(node)
              );
              break;
            case "attributes":
              if (!summary.attributeChanged[mutation.attributeName]) {
                summary.attributeChanged[mutation.attributeName] = [];
              }
              summary.attributeChanged[mutation.attributeName].push(
                mutation.target
              );
              break;
            case "characterData":
              summary.characterDataChanged.push(mutation.target);
              break;
          }
        });

        return [summary];
      };

      MutationSummary.prototype.disconnect = function () {
        this.observer.disconnect();
      };

      var TreeMirrorClient = (function () {
        function TreeMirrorClient(target, mirror, testingQueries) {
          var _this = this;
          this.target = target;
          this.mirror = mirror;
          this.nextId = 1;
          this.knownNodes = new NodeMap();
          this.changes = { removed: [], moved: [], attributes: [], text: [] };
          var rootId = this.serializeNode(target).id;
          var children = [];
          for (var child = target.firstChild; child; child = child.nextSibling)
            children.push(this.serializeNode(child, true));

          return this.mirror.initialize(rootId, children);
          var self = this;
          var queries = [{ all: true }];
          if (testingQueries) queries = queries.concat(testingQueries);
          this.mutationSummary = new MutationSummary({
            rootNode: target,
            callback: function (summaries) {
              _this.applyChanged(summaries);
            },
            queries: queries,
          });

          return children;
        }

        TreeMirrorClient.prototype.disconnect = function () {
          if (this.mutationSummary) {
            this.mutationSummary.disconnect();
            this.mutationSummary = undefined;
          }
        };

        TreeMirrorClient.prototype.rememberNode = function (node) {
          var id = this.nextId++;
          this.knownNodes.set(node, id);
          return id;
        };

        TreeMirrorClient.prototype.forgetNode = function (node) {
          this.knownNodes.delete(node);
        };

        TreeMirrorClient.prototype.serializeNode = function (node, recursive) {
          if (node === null) return null;
          var id = this.knownNodes.get(node);
          if (id !== undefined) {
            return { id: id };
          }
          var data = {
            nodeType: node.nodeType,
            id: this.rememberNode(node),
          };
          switch (data.nodeType) {
            case Node.DOCUMENT_TYPE_NODE:
              var docType = node;
              data.name = docType.name;
              data.publicId = docType.publicId;
              data.systemId = docType.systemId;
              break;
            case Node.COMMENT_NODE:
            case Node.TEXT_NODE:
              data.textContent = node.textContent;
              break;
            case Node.ELEMENT_NODE:
              var elm = node;
              data.tagName = elm.tagName;
              data.attributes = {};
              for (var i = 0; i < elm.attributes.length; i++) {
                var attr = elm.attributes[i];
                data.attributes[attr.name] = attr.value;
              }
              if (recursive && elm.childNodes.length) {
                data.childNodes = [];
                for (
                  var child = elm.firstChild;
                  child;
                  child = child.nextSibling
                )
                  data.childNodes.push(this.serializeNode(child, true));
              }
              break;
          }
          return data;
        };

        TreeMirrorClient.prototype.serializeAddedAndMoved = function (
          added,
          reparented,
          reordered
        ) {
          var _this = this;
          var all = added.concat(reparented).concat(reordered);
          var parentMap = new NodeMap();
          all.forEach(function (node) {
            var parent = node.parentNode;
            var children = parentMap.get(parent);
            if (!children) {
              children = new NodeMap();
              parentMap.set(parent, children);
            }
            children.set(node, true);
          });
          var moved = [];
          parentMap.keys().forEach(function (parent) {
            var children = parentMap.get(parent);
            var keys = children.keys();
            while (keys.length) {
              var node = keys[0];
              while (node.previousSibling && children.has(node.previousSibling))
                node = node.previousSibling;
              while (node && children.has(node)) {
                var data = _this.serializeNode(node);
                data.previousSibling = _this.serializeNode(
                  node.previousSibling
                );
                data.parentNode = _this.serializeNode(node.parentNode);
                moved.push(data);
                children.delete(node);
                node = node.nextSibling;
              }
              var keys = children.keys();
            }
          });
          return moved;
        };

        TreeMirrorClient.prototype.serializeAttributeChanges = function (
          attributeChanged
        ) {
          var _this = this;
          var map = new NodeMap();
          Object.keys(attributeChanged).forEach(function (attrName) {
            attributeChanged[attrName].forEach(function (element) {
              var record = map.get(element);
              if (!record) {
                record = _this.serializeNode(element);
                record.attributes = {};
                map.set(element, record);
              }
              record.attributes[attrName] = element.getAttribute(attrName);
            });
          });
          return map.keys().map(function (node) {
            return map.get(node);
          });
        };

        TreeMirrorClient.prototype.applyChanged = function (summaries) {
          var _this = this;
          var summary = summaries[0];
          var removed = summary.removed.map(function (node) {
            return _this.serializeNode(node);
          });
          var moved = this.serializeAddedAndMoved(
            summary.added,
            summary.reparented,
            summary.reordered
          );
          var attributes = this.serializeAttributeChanges(
            summary.attributeChanged
          );
          var text = summary.characterDataChanged.map(function (node) {
            var data = _this.serializeNode(node);
            data.textContent = node.textContent;
            return data;
          });

          this.changes = { removed, moved, attributes, text };

          this.mirror.applyChanged(removed, moved, attributes, text);
          summary.removed.forEach(function (node) {
            _this.forgetNode(node);
          });
        };

        TreeMirrorClient.prototype.getChanges = function () {
          return this.changes;
        };

        return TreeMirrorClient;
      })();

      return new TreeMirrorClient(document, {
        initialize: function (aQ, aR) {
          var aS = {
            ty: 5,
            ti: 0,
            te: JSON.stringify({
              rootId: aQ,
              children: aR,
            }),
          };
          //   if (!ak.initialDOM) {
          //     ak.initialDOM = aS.te;
          //     typeof heatmapDebugger !== "undefined"
          //       ? heatmapDebugger.updateDomSerialization("sessionRecording", 1)
          //       : null;
          //   }
          //z.recordData(c, aS);
          return aS;
        },
        applyChanged: function (aT, aR, aQ, aU) {
          if (aT.length || aR.length || aQ.length || aU.length) {
            var aS = {
              ti: au.getTimeSincePageReady(),
              ty: ag,
              te: {},
            };
            if (aT.length) {
              aS.te.rem = aT;
            }
            if (aR.length) {
              aS.te.adOrMo = aR;
            }
            if (aQ.length) {
              aS.te.att = aQ;
            }
            if (aU.length) {
              aS.te.text = aU;
            }
            aS.te = JSON.stringify(aS.te);
            z.recordData(c, aS);
          }
        },
      });
    });
  };

  console.log("fetching initial mutation")
  const initialMutation = await getInitialMutation();
  await browser.close();

  return initialMutation;
}

Run("https://www.thejellybee.com")
.then((initialMutation) => {

  // const filePath = path.join(__dirname, 'initialMutationOutput.json');

  // fs.writeFile(filePath, JSON.stringify(initialMutation), (err) => {
  //   if (err) {
  //     console.error('Error writing to file', err);
  //   } else {
  //     console.log('File has been written successfully');
  //   }
  // });
})
.catch((error) => {
  console.log("Error in Run", error);
});