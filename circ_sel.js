// создаёт объект предназначенный для
// выбора значений расположенных на 
// окружности
class CircleSelect {
	constructor(settings) {
		this.min          = settings.min          || 0;
		this.max          = settings.max          || 10;
		this.step         = settings.step         || 1;
		this.radius       = settings.radius       || 138;
		this.v_radius     = settings.value_radius || 17;
		this.n_values     = (this.max - this.min) / this.step; // количество значений
		this.n_intervals  = this.n_values + 1;                 // количество интервалов
		this.selected     = settings.min;
		this.addElement();   // добавляем сам элемент
		this.appendValues(); // добавляем значения
		this.appendEvents(); // добавляем обработчики событий
	}

	addElement() {
		this.element = $("<div class='select-circle centered no-selectable'><div class='button select'>Select</div></div>");
		this.element.height(this.radius*2);
		this.element.width(this.radius*2);
		this.element.hide();
	}

	// добавляем значения, которые можно выбрать
	appendValues() {
		// проходимся от минимального значения
		// до максимального с указанным шагом
		// параллельно инкрементируем i - индекс значения
		for(let value = this.min, i = 0; value <= this.max; value+=this.step, i++) {
			let value_elem = $(`<div class='value'>${value}</div>`); // создаём элемент-value
			if(i == 0) value_elem.addClass("selected");              // выбираем первый элемент
			let phi = 2*Math.PI * i / this.n_intervals - Math.PI/2;  // вычисляем угол
			let x = Math.round(this.radius + this.radius * Math.cos(phi) - this.v_radius);
			let y = Math.round(this.radius + this.radius * Math.sin(phi) - this.v_radius);
			value_elem.css({
				"left"  : x + "px",
				"top"   : y + "px",
				"width" : this.v_radius*2 + "px",
				"height": this.v_radius*2 + "px"
			});
			this.element.append(value_elem);
		}
	}

	appendEvents() {
		var $this = this;
		// обработчик кнопки выбора
		$(this.element).on("click", ".select", function(){
			$(this.parentNode).off("click", ".select");
			$(this.parentNode).fadeOut();
			$this.selected = parseInt($(".selected", this.parentNode).text());
			console.log($this.selected);
		});

		// click по value
		$(this.element).on("click", ".value", function() {
			$(".value", this.parentNode).removeClass("selected");
			$(this).addClass("selected");
		});
	}
}