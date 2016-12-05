function $(query) {
    return new ofekQuery(query);
};

var ofekQuery = function (query) {
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
        if (queryResult[0] === null) {
            this.result = null;
        } else {
            this.result = queryResult;
        }
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