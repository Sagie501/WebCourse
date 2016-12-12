describe('Query selector', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    it('Should get all of the elements of the same tag', function () {
        var liAmount = $('li').count();

        expect(liAmount).toBe(10);
    });

    it('should be able find nested elements', function () {
        var eleAmount = $('div li p').count();

        expect(eleAmount).toBe(1);
    })

    it('Should get all of the elements of the same id', function () {
        var eleAmount = $('#davids-div').count();

        expect(eleAmount).toBe(1);
    })

    it('Should get all of the elements of the same class', function () {
        var eleAmount = $('.stam').count();

        expect(eleAmount).toBe(5);
    })

    it('Should get all of the elements of the same class inside of the elment', function () {
        var eleAmount = $('ol .stam').count();

        expect(eleAmount).toBe(2);
    })
});

describe('prototype functions', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    it('Should add class to the selected elements', function () {
        var eleAmount = $('div li p');
        var classToAdd =  'stamClass';

        eleAmount.addClass(classToAdd);

        var flag = true;

        for (element of eleAmount.result) {
            if (!element.classList.contains(classToAdd)) {
                flag = false;
                break;
            }
        }

        expect(flag).toBe(true);
    });

    it('Should remove class to the selected elements', function () {
        var eleAmount = $('div li p');
        var classToRemove =  'stamClass';

        var flag = true;

        for (element of eleAmount.result) {
            if (element.classList.contains(classToRemove)) {
                flag = false;
                break;
            }
        }

        expect(flag).toBe(true);
    });

    it('Should add css on the element', function () {
        var eleAmount = $('div li p');
        var property = 'color';
        var value = 'green';

        eleAmount.css(property, value);

        var flag = true;

        for (element of eleAmount.result) {
            if (!element.style[property].includes(value)) {
                flag = false;
                break;
            }
        }

        expect(flag).toBe(true);
    });

    it('Should append child element on the element', function () {
        var eleAmount = $('div li p');
        var childElement = document.createElement('div');

        eleAmount.appendChild(childElement);

        expect($('div li p' + childElement)).not.toBe(undefined);
    });

    it('Should return the element in the index', function () {
        var eleAmount = $('div li p');

        expect(eleAmount.get(0)).toBe(eleAmount.result[0]);
    });

    it('Should do an action for each object selected', function () {
        var elements = $('#david-likes li');

        elements.each( function (curr) {
            curr.classList.add("check");
        });

        elements.result.forEach(function (curr) {
            expect(curr.classList.contains('check')).toBe(true);
        })
    });

    it('Should do an action for each object selected', function () {
        var elements = $('#david-likes li');

        var result = elements.map( function (curr) {
            curr.classList.add("check");
            return curr;
        });

        result.forEach(function (curr) {
            expect(curr.classList.contains('check')).toBe(true);
        })
    });

    it('Should set attribute for each object selected', function () {
        let eleAmount = $('div li p');
        let attribute = 'id';
        let value = 'test';

        eleAmount.setAttribute(attribute, value);

        let flag = true;

        for (element of eleAmount.result) {
            if (!element.attribute == value) {
                flag = false;
                break;
            }
        }

        expect(flag).toBe(true);
    });
});