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

        eleAmount.addClass('stamClass');

        expect(eleAmount.result[0].classList.contains('stamClass')).toBe(true);
    });

    it('Should remove class to the selected elements', function () {
        var eleAmount = $('div li p');

        eleAmount.removeClass('stamClass');

        expect(eleAmount.result[0].classList.contains('stamClass')).toBe(false);
    })

    it('Should do the function on each element', function () {
        var eleAmount = $('div li p');

        function check() {

        }

        expect(eleAmount.result[0].classList.contains('stamClass')).toBe(false);
    })
});