describe('Object에 대해서 학습합니다.', function () {
  /*
    이번 과제에서는 객체의 기본적인 내용을 재확인합니다.
    이머시브 과정에서 객체를 보다 자세하게 학습하게 됩니다. (예. prototype)
  */
  it('Object의 기본을 확인합니다.', function () {
    const emptyObj = {};
    expect(typeof emptyObj === 'object').to.equal(true);
    expect(emptyObj.length).to.equal(undefined); // 객체에서 길이를 구하고 싶으면 Object.keys(obj).length 써야한다.

    const megalomaniac = {
      mastermind: 'Joker',
      henchwoman: 'Harley',
      getMembers: function () {
        return [this.mastermind, this.henchwoman];
      },
      relations: ['Anarky', 'Duela Dent', 'Lucy'],
      twins: {
        'Jared Leto': 'Suicide Squad',
        'Joaquin Phoenix': 'Joker',
        'Heath Ledger': 'The Dark Knight',
        'Jack Nicholson': 'Tim Burton Batman',
      },
    };

    expect(megalomaniac.length).to.equal(undefined);  // 객체에서 길이를 구하고 싶으면 Object.keys(obj).length 써야한다.
    expect(megalomaniac.mastermind).to.equal('Joker');
    expect(megalomaniac.henchwoman).to.equal('Harley');
    expect(megalomaniac.henchWoman).to.equal(undefined);  // W가 대문자라서 없다.
    expect(megalomaniac.getMembers()).to.deep.equal(['Joker', 'Harley']);
    expect(megalomaniac.relations[2]).to.equal('Lucy');
    expect(megalomaniac.twins['Heath Ledger']).to.deep.equal('The Dark Knight');
  });

  it('Object의 속성(property)를 다루는 방법을 확인합니다.', function () {
    const megalomaniac = { mastermind: 'Agent Smith', henchman: 'Agent Smith' };

    expect('mastermind' in megalomaniac).to.equal(true); //in 연산자는 명시된 속성이 명시된 객체에 존재하면 true를 반환합니다.

    megalomaniac.mastermind = 'Neo';
    expect(megalomaniac['mastermind']).to.equal('Neo');

    expect('secretary' in megalomaniac).to.equal(false);

    megalomaniac.secretary = 'Agent Smith';
    expect('secretary' in megalomaniac).to.equal(true);

    delete megalomaniac.henchman;
    expect('henchman' in megalomaniac).to.equal(false);  // 위에서 delete 썼다. 없다.
  });

  it("'this'는 method를 호출하는 시점에 결정됩니다.", function () {
    const currentYear = new Date().getFullYear();  // new Date() : 현재 시간과 날짜가 나온다
    const megalomaniac = {                         //getFullYear() 메서드는 주어진 날짜의 현지 시간 기준 연도를 반환
      mastermind: 'James Wood',
      henchman: 'Adam West',
      birthYear: 1970,
      calculateAge: function (currentYear) {
        return currentYear - this.birthYear;
      },
      changeBirthYear: function (newYear) {
        this.birthYear = newYear;
      },
    };

    expect(currentYear).to.equal(2023);
    expect(megalomaniac.calculateAge(currentYear)).to.equal(53);

    megalomaniac.birthYear = 2000;
    expect(megalomaniac.calculateAge(currentYear)).to.equal(23);

    megalomaniac.changeBirthYear(2010);
    expect(megalomaniac.calculateAge(currentYear)).to.equal(13);

  /**
   * !!Advanced [this.mastermind]? this.birthYear? this가 무엇일까요?
   * 
   * method는 '어떤 객체의 속성으로 정의된 함수'를 말합니다. 위의 megalomaniac 객체를 예로 든다면,
   * getMembers는 megalomaniac 객체의 속성으로 정의된 함수인 '메소드'라고 할 수 있습니다. megalomaniac.getMembers()와 같은 형태로 사용(호출)할 수 있죠.
   * 사실은, 전역 변수에 선언한 함수도 웹페이지에서 window 객체의 속성으로 정의된 함수라고 할 수 있습니다. 
   * window. 접두사 없이도 참조가 가능하기 때문에(window.foo()라고 사용해도 됩니다.), 생략하고 쓰는 것뿐입니다. 이렇듯, method는 항상 '어떤 객체'의 method입니다.
   * 따라서 호출될 때마다 어떠한 객체의 method일 텐데, 그 '어떠한 객체'를 묻는 것이 this입니다.
   * 예시로, obj이라는 객체 안에 foo라는 메서드를 선언하고, this를 반환한다고 했을 때 ( 예: let obj = {foo: function() {return this}}; )
   * obj.foo() === obj 이라는 코드에 true라고 반환할 것입니다.
   * this는 함수의 호출에 따라서 값이 달라지기도 합니다. (apply나 call, bind에 대해서는 하단의 학습자료를 통해 더 공부해 보세요.)
   * 
   * 그러나 화살표 함수는 다릅니다. 자신의 this가 없습니다.
   * 화살표 함수에서의 this는 자신을 감싼 정적 범위(lexical context)입니다. (전역에서는 전역 객체를 가리킵니다.)
   * 일반 변수 조회 규칙(normal variable lookup rules)을 따르기 때문에, 현재 범위에서 존재하지 않는 this를 찾을 때, 화살표 함수 바로 바깥 범위에서 this를 찾습니다.
   * 그렇기에 화살표 함수를 사용할 때, 이러한 특이점을 생각하고 사용해야 합니다.
   * 
   * 이와 관련하여, this에 대해서 더 깊이 학습하셔도 좋습니다.
   * 가이드가 될 만한 학습자료를 첨부합니다.
   * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
   */
  });

  it('객체의 method를 정의하는 방법을 확인합니다.', function () {
    const megalomaniac = {
      mastermind: 'Brain',
      henchman: 'Pinky',
      getFusion: function () {
        return this.henchman + this.mastermind;
      },
      battleCry(numOfBrains) {
        return `They are ${this.henchman} and the` + ` ${this.mastermind}`.repeat(numOfBrains);
      },
    };

    expect(megalomaniac.getFusion()).to.deep.equal('PinkyBrain');
    expect(megalomaniac.battleCry(3)).to.deep.equal(`They are Pinky and the Brain Brain Brain`);
  });

  it('Object를 함수의 전달인자로 전달할 경우, reference가 전달됩니다.', function () {
    const obj = {
      mastermind: 'Joker',
      henchwoman: 'Harley',
      relations: ['Anarky', 'Duela Dent', 'Lucy'],
      twins: {
        'Jared Leto': 'Suicide Squad',
        'Joaquin Phoenix': 'Joker',
        'Heath Ledger': 'The Dark Knight',
        'Jack Nicholson': 'Tim Burton Batman',
      },
    };

    function passedByReference(refObj) {
      refObj.henchwoman = 'Adam West';
    }
    passedByReference(obj);
    expect(obj.henchwoman).to.equal('Adam West'); // 바로위에 obj를 passedByReference에 넣었다.

    const assignedObj = obj;  // 안의 내용만 복사한 것 obj가 바뀌는 것이 아니다.
    assignedObj['relations'] = [1, 2, 3];  
    expect(obj['relations']).to.deep.equal([1, 2, 3]);  // ?

    const copiedObj = Object.assign({}, obj); // Object.assign() 메서드는 출처 객체들의 모든 열거 가능한 자체 속성을 복사해 대상 객체에 붙여넣습니다. 그 후 대상 객체를 반환합니다.
    copiedObj.mastermind = 'James Wood';
    expect(obj.mastermind).to.equal('Joker');  // obj값이 변하진 않는다.

    obj.henchwoman = 'Harley';                    // obj값에 넣는다.
    expect(copiedObj.henchwoman).to.equal('Adam West'); //130번째 줄에서 Adam West로 변환했다. 그 전에 변화했던 obj를 copiedObj에 넣었으니까 아담이 있다.

    delete obj.twins['Jared Leto'];
    expect('Jared Leto' in copiedObj.twins).to.equal(false); // 왜 false?

    /*
    마지막 테스트 코드의 결과가 예상과는 달랐을 수도 있습니다.
    'Object.assign'을 통한 복사는 reference variable은 주소만 복사하기 때문입니다. 
    이와 관련하여 얕은 복사(shallow copy)와 깊은 복사(deep copy)에 대해서 학습하시기 바랍니다.
    가이드가 될 만한 학습자료를 첨부합니다.
      https://scotch.io/bar-talk/copying-objects-in-javascript
      https://medium.com/watcha/깊은-복사와-얕은-복사에-대한-심도있는-이야기-2f7d797e008a
    */
  });
});
