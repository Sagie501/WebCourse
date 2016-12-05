function $(query) {
    return new OfekQuery(query);
}

var OfekQuery = function (query) {
    this.result = [];

    var types = {
        '#': function (query) {
            return getElementWithId(query);
        },
        '.' : function (query) {
            return getElementsWithClass(query);
        },
        null : function (query) {
            return getElementsWithName(query);
        }
    };

    if (validQuery(query)) {
        var queryList = splitQuery(query);
        var lastQuery = queryList[queryList.length - 1];

        var possibleResults = types[getQueryType(lastQuery)](lastQuery);
        var queryResult = [];
        queryList.pop();
        possibleResults.forEach(function(currPossibleResult) {

            if (hasAncestors(currPossibleResult, queryList)) {
                queryResult.push(currPossibleResult);
            }
        });
        this.result = queryResult.slice(0);
    }
};

var hasAncestors = function(child, ancestorList) {
    var newAncestorList = ancestorList.slice(0);
    if (newAncestorList.length === 0) {
        return true;
    }

    var lastAncestor = newAncestorList[newAncestorList.length - 1];

    var types = {
        '#': function (id, child) {
            return isDescendantOfId(id, child);
        },
        '.' : function (className, child) {
            return isDescendantOfClass(className, child);
        },
        null : function (element, child) {
            return isDescendantOfElement(element, child);
        }
    };

    if (types[getQueryType(lastAncestor)](lastAncestor, child)) {
        newAncestorList.pop();
        return hasAncestors(child, newAncestorList);
    } else {
        return false;
    }

};

var getQueryType = function(query) {
    return new RegExp("[\#,\.]").exec(query.charAt(0));
};

var getElementWithId = function(id) {
    return new Array(document.getElementById(id.substring(1)));
};

var getElementsWithClass = function (className) {
    return Array.from(document.getElementsByClassName(className.substring(1)));
};

var getElementsWithName = function (elementName) {
    return Array.from(document.getElementsByTagName(elementName));
};

var isDescendantOfElement = function(elementName, childElement) {
    var node = childElement.parentNode;
    while (node !== null && node !== document) {
        if (node.nodeName.toLowerCase() === elementName) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

var isDescendantOfId = function(elementId, childElement) {
    var node = childElement.parentNode;
    while (node !== null && node !== document) {
        if (node.id === elementId.substring(1)) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

var isDescendantOfClass = function(elementClass, childElement) {
    var node = childElement.parentNode;
    while (node !== null && node !== document) {
        if (node.classList.contains(elementClass.substring(1))) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

var validQuery = function (query) {
    return !(query === null || typeof query !== "string" || query === "" || query === undefined);
};

var splitQuery = function(query) {
    return query.split(" ");
};

OfekQuery.prototype.addClass = function (class_name) {
    this.result.forEach(function (result) {
        result.classList.add(class_name);
    });
};

OfekQuery.prototype.removeClass = function (class_name) {
    this.result.forEach(function (result) {
        result.classList.remove(class_name);
    });
};

OfekQuery.prototype.each = function (fn) {
    this.result.forEach(function (result) {
        fn(result);
    });
};

OfekQuery.prototype.map = function (fn) {
    var newArray = [];
    this.result.forEach(function (result) {
        newArray.push(fn(result));
    });
    return newArray;
};

var runTestOnObject = function (object, tests) {
  for (test of tests) {
      if (!test(object)) {
          return false;
      }
  }
  return true;
};

OfekQuery.prototype.any = function () {
    for (result of this.result) {
        if (runTestOnObject(result, arguments)) {
            return true;
        }
    }
    return false;
};

OfekQuery.prototype.all = function () {
    for (result of this.result) {
        if (!runTestOnObject(result, arguments)) {
            return false;
        }
    }
    return true;
};

OfekQuery.prototype.filter = function () {
    var newOfekQuery = new OfekQuery();
    for (result of this.result) {
        if (runTestOnObject(result, arguments)) {
            newOfekQuery.result.push(result);
        }
    }
    return newOfekQuery;
};

OfekQuery.prototype.css = function (property, value) {
    this.result.forEach(function (result) {
        result.style[property] = value;
    });
};

OfekQuery.prototype.count = function () {
    return this.result.length;
};

OfekQuery.prototype.appendChild = function (childElement) {
    this.result.forEach(function (result) {
        result.appendChild(childElement);
    });
};

OfekQuery.prototype.getAttribute = function (attributeName) {
    var attributes = [];
    this.result.forEach(function (result) {
        attributes.push(result.getAttribute(attributeName));
    });
    return attributes;
};

OfekQuery.prototype.setAttribute = function (attributeName, attributeValue) {
    this.result.forEach(function (result) {
        result.setAttribute(attributeName, attributeValue);
    });
};

OfekQuery.prototype.get = function (index) {
    return this.result[index];
};