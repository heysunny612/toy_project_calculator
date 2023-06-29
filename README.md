# 토이프로젝트 계산기 

<p align="center">
    <img src="https://user-images.githubusercontent.com/127499117/235738882-9c22dc7f-4142-4be3-8d6d-c66c2eedd8cc.gif" alt="Animation12334">
</p>

> 정말 많은 메소드들을 사용하여 계산기를 구현하였다. String 메소드인 includes,  Array 메소드인 filter,forEach, Array.form 외에 문자열을 실수로 바꾸는 parseFloat() 함수를 사용하였고, 지난 토이프로젝트인 카카오맵에서 사용하였던 swich문도 복습할 수 있었다.! 

<br/>
<br/>

## 새로 배운 것들

 <br/>

```js
 appendNumber(number) {
      if (number === '.' && this.currentValue.includes('.')) return;
      this.currentValue = this.currentValue += number;
  }

   setOperation(operation) {
      this.resetOperation();
      this.operation = operation;
      this.prevValue = this.currentValue;
      this.currentValue = '';

      const elements = Array.from(operationButtons);
      const element = elements.filter((element) =>
        element.innerText.includes(operation)
      )[0];
      element.classList.add('active');
    }

```

## 1.String.prototype.includes

- **ES6에서 도입된 includes 메서드는 대상 문자열에 인수로 전달받은 문자열이 포함되어 있는지 그 결과를 true또는 false 값으로 반환한다.**
- 계산기에서 소수점을 나타내는 "."은 한번 이상 입력되면 안되기 때문에, 클릭한 값이 "."이고 그리고 이미 입력된 값에 "."이 있다면 return하여, 바로 뒤에 나오는 코드가 실행되지 않게 하였다. (뒤 실행 코드는, 클릭된 값을 받아 출력해주는 코드이다.)

 <br/>
 
## 2. Array.prototype.filter
- **filter 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백함수를 반복 호출한다. 그리고, 콜백 함수의 반환값이 ★true★인 요소로만 구성된 새로운 배열을 반환한다. 이때 원본 배열은 변경되지 않는다.**
- 연산자를 클릭했을 경우, 해당 엘레멘트 요소에 클래스 active를 추가하여, 다른 연산자와 구분될 수 있게 해주었다. 같은 클래스를 가지고 있는 연산자중 "클릭된" 연산자와 일치하는 경우를 찾아내기 위해 filter를 사용하였다. 

<br/>

## 3. Array.from
- **ES6에서 도입된 Array.from 메서드는 유사 배열 객체(array-like-object) 또는 이터러블 객체(iterable)를 인수로 전달받아 배열로 변환하여 반환한다.※arguments, NodeList, HTMLCollection은 유사 배열 객체이면서도 이터러블이다.**
- 연산자 버튼에 동일한 클래스네임을 부여하여, 태그를 만들었고  queryselectAll로 전부 받아왔다. 받아온 버튼들은 "NodeList"로 유사배열객체이자 이터러블 객체이기때문에, Array.from으로 배열로 변환하여 배열의 메소드인 filter를 사용할 수 있게 해주었다. 

 <br/>

```js
 compute() {
      let computation;
      const prev = parseFloat(this.prevValue);
      const current = parseFloat(this.currentValue);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '÷':
          computation = prev / current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '+':
          computation = prev + current;
          break;
        default:
          return;
      }
      this.currentValue = computation;
      this.prevValue = '';
      this.resetOperation();
    }
```

## 4. parseFloat()
- **parseFloat()는 문자열을 실수로 바꾸는 함수이다.**
- 엘리먼트의 innerText로 들어간 값은 숫자가 들어가도 전부 String이므로 연산을 위해 parseFloat()를 사용해 Number로 바꾸었다. 
