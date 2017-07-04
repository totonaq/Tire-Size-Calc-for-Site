

(function() {
"use strict"

	function qs(el) {
		return document.querySelector(el);
	}
	const inch = 25.4,
		mm = ' мм',
		inchQuote = '"';

	let measurement = mm;

	let table = qs('#results'),
		//selects
		tireDiameterOld = qs('#tire_diameter_old'),
		tireDiameterNew = qs('#tire_diameter_new'),

		tireHeightOld = qs('#tire_height_old'),
		tireHeightNew = qs('#tire_height_new'),

		tireWidthOld = qs('#tire_width_old'),
		tireWidthNew = qs('#tire_width_new'),

		//table rows
		diameter = qs('#diameter'),
		width = qs('#width'),
		circumference = qs('#circumference'),
		sidewallHeight = qs('#sidewall_height'),
		rev = qs('#rev'),
		clearence = qs('#clearence'),
		resMsg = qs('#result-message'),

		//classes for insertions
		oldClass = '.old',
		newClass = '.new',
		diffClass = '.diff',

		hiddenArea = qs('.hidden-area'),
		
		//wrapper layouts of tires
		oldSide = qs('.img-old-side'),
		oldFront = qs('.img-old-front'),
		newSide = qs('.img-new-side'),
		newFront = qs('.img-new-front'),
	
		//speed
		speedometer = qs('.speed-wrap'),
		deviceSpeedVal = qs('#device-value'),
	
		//buttons
		mmBtn = qs('#mm'),
		inchBtn = qs('#inches'),
		calcBtn = qs('#calc_button'),
		switcher = qs('#switch-bg'),
		up = qs('#up'),
		down = qs('#down'),

		tableMethods = {
			msgText: 'Диаметр отличается в пределах 3%',
			warningTxt: 'Диаметр отличается более чем на 3%. Это опасно!',
			imgWidth: 200,
			diamTxt: 'Диаметр колеса',
			sideHeightTxt: 'Высота профиля',
			widthTxt: 'Ширина протектора',
			maxSpeed: 240,
			minSpeed: 0,
			defaultSpeed: 60,
			

			fillTable: function(selector, oldValue, newValue) {
				let diff, sign, img = '', msr = measurement;
				let percent = this.setPercentage(oldValue, newValue);

				oldValue - newValue >= 0 ? sign = '' : sign = '+';
				if (percent === 0) sign = '';

				if (selector === diameter) {
					if (Math.abs(percent) <= 3) {
						img = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 70 70" style="enable-background:new 0 0 70 70;" xml:space="preserve" width="25px" height="25px"><g><g><g><path d="M26.474,70c-2.176,0-4.234-1.018-5.557-2.764L3.049,43.639C0.725,40.57,1.33,36.2,4.399,33.875     c3.074-2.326,7.441-1.717,9.766,1.35l11.752,15.518L55.474,3.285c2.035-3.265,6.332-4.264,9.604-2.232     c3.268,2.034,4.266,6.334,2.23,9.602l-34.916,56.06c-1.213,1.949-3.307,3.175-5.6,3.279C26.685,69.998,26.58,70,26.474,70z" fill="#21775f"/></g></g></g></svg>';
						resMsg.style.backgroundColor = '#21775f';
						resMsg.innerText = this.msgText;
					} else {
						img = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 286.054 286.054" style="enable-background:new 0 0 286.054 286.054;" xml:space="preserve" width="25px" height="25px"><g><path style="fill:#ff3046;" d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843C160.878,195.732,152.878,187.723,143.036,187.723z"/></g></svg>';
						resMsg.style.backgroundColor = '#d6c72b';
						resMsg.innerText = this.warningTxt;
					}	
				}

				if (selector !== rev) {
					oldValue = this.convertMeasures(oldValue);
					newValue = this.convertMeasures(newValue);
					msr = measurement;
				} else {
					oldValue = Math.round(oldValue);
					newValue = Math.round(newValue);
					msr = '';
				}
				
				if (msr === inchQuote) {
					diff = (newValue - oldValue).toFixed(1);
				} else {
					diff = newValue - oldValue;
				}

				selector.querySelector(oldClass).innerText = 
					oldValue + msr;
				selector.querySelector(newClass).innerText = 
					newValue + msr;
				selector.querySelector(diffClass).innerHTML = 
					diff + msr + ' (' + sign + percent + '%)' + 
					' ' + img;

			},

			setPercentage: function(a, b) {
				return Math.round(-(a - b) / a * 100);
			},

			convertMeasures: function(arg) {
				if (measurement === mm) {
					return Math.round(arg);
				} else {
					return (arg / inch).toFixed(1);
				}
			},

			getTableParams: function() {	

				//VALUE FROM SELECT
				this.oldDiscDiam = tireDiameterOld.value;
				this.newDiscDiam = tireDiameterNew.value;

				this.oldProfileHeight = tireHeightOld.value;
				this.newProfileHeight = tireHeightNew.value;

				this.oldWidth = tireWidthOld.value;
				this.newWidth = tireWidthNew.value;

				//CALCULATED VALUES
				this.oldHeight = this.oldWidth * this.oldProfileHeight / 100;
				this.newHeight = this.newWidth * this.newProfileHeight / 100;

				this.oldDiscDiamMM = this.oldDiscDiam * inch;
				this.newDiscDiamMM = this.newDiscDiam * inch;

				this.oldDiam = this.oldHeight * 2 + this.oldDiscDiamMM;
				this.newDiam = this.newHeight * 2 + this.newDiscDiamMM;

				this.oldCirc = Math.PI * this.oldDiam;
				this.newCirc = Math.PI * this.newDiam;

				this.oldRevs = Math.round(1000000 / this.oldCirc);
				this.newRevs = Math.round(1000000 / this.newCirc);

				this.diffDiam = this.newDiam - this.oldDiam;

				this.diamRate = this.newDiam/this.oldDiam;

			},

			setTableParams: function() {
				this.fillTable(diameter, this.oldDiam, this.newDiam);
				this.fillTable(width, this.oldWidth, this.newWidth);
				this.fillTable(circumference, this.oldCirc, this.newCirc);
				this.fillTable(sidewallHeight, this.oldHeight, this.newHeight);
				this.fillTable(rev, this.oldRevs, this.newRevs);
				clearence.querySelector(diffClass).innerText = 
					this.convertMeasures(this.diffDiam / 2) + measurement;
			},

			getImageParams: function() {
				/*
				 *calculate what tire is the largest and set it 
				 *diameter = this.imgWidth (default 200). Another
				 *tire get scaled diameter
				 */

				this.scaledOldDiam = (this.oldDiam > this.newDiam) ? 
					this.imgWidth : this.imgWidth / (this.newDiam / this.oldDiam);
				this.scaledNewDiam = (this.oldDiam > this.newDiam) ? 
					this.imgWidth / (this.oldDiam / this.newDiam) : this.imgWidth;

				this.scaledOldWidth = this.oldWidth * 
					this.scaledOldDiam / this.oldDiam;
				this.scaledNewWidth = this.newWidth * 
					this.scaledNewDiam / this.newDiam;


				this.scaledOldDiscDiam = this.oldDiscDiamMM * 
					this.scaledOldDiam / this.oldDiam;
				this.scaledNewDiscDiam = this.newDiscDiamMM * 
					this.scaledNewDiam / this.newDiam;
			},

			setImageParams: function() {
				//set width and height 
				//to the wrapper layouts of tires
				oldSide.style.width = newSide.style.width = 
				oldSide.style.height = newSide.style.height = 
				oldFront.style.width = newFront.style.width =
				this.imgWidth + 'px';

				//set dimensions of the old images
				
				oldFront.childNodes[1].style.height = 
					oldSide.childNodes[1].style.width = 
					oldSide.childNodes[1].style.height = 
					this.scaledOldDiam + 'px';

				oldFront.childNodes[1].style.width = 
					this.scaledOldWidth + 'px';

				oldSide.childNodes[1].childNodes[1].style.width = 
					oldSide.childNodes[1].childNodes[1].style.height = 
					this.scaledOldDiscDiam + 'px';

				//set dimensions of the new images
				newFront.childNodes[1].style.height = 
					newSide.childNodes[1].style.width = 
					newSide.childNodes[1].style.height = 
					this.scaledNewDiam + 'px';

				newFront.childNodes[1].style.width = 
					this.scaledNewWidth + 'px';

				newSide.childNodes[1].childNodes[1].style.width =
					newSide.childNodes[1].childNodes[1].style.height =
					this.scaledNewDiscDiam + 'px';

			},

			setImageTitles: function() {

				//set values to .descr-v ( < .*-diameter)
				oldSide.childNodes[1].childNodes[3].childNodes[1].innerText = 
				this.diamTxt + ' ' + this.convertMeasures(this.oldDiam) + measurement;
				newSide.childNodes[1].childNodes[3].childNodes[1].innerText = 
				this.diamTxt + ' ' + this.convertMeasures(this.newDiam) + measurement;

				//set values to .descr-h ( < .*-side-height)
				oldSide.childNodes[1].childNodes[5].childNodes[1].innerText = 
				this.sideHeightTxt + ' ' + this.convertMeasures(this.oldHeight) + measurement;
				newSide.childNodes[1].childNodes[5].childNodes[1].innerText = 
				this.sideHeightTxt + ' ' + this.convertMeasures(this.newHeight) + measurement;

				//set values to .descr-h ( < .*-width)
				oldFront.childNodes[1].childNodes[1].childNodes[1].innerText = 
				this.widthTxt + ' ' + this.convertMeasures(this.oldWidth) + measurement;
				newFront.childNodes[1].childNodes[1].childNodes[1].innerText = 
				this.widthTxt + ' ' + this.convertMeasures(this.newWidth) + measurement;

			},

			setImageTitlesWidth: function() {

				oldSide.childNodes[1].childNodes[5].style.width = 
					(this.scaledOldDiam - this.scaledOldDiscDiam) / 2 + 'px';

				newSide.childNodes[1].childNodes[5].style.width = 
					(this.scaledNewDiam - this.scaledNewDiscDiam) / 2 + 'px';
			},

			setSpeedParams: function() {
				this.getSpeedDiff();
				this.setSpeedDiff();
				this.getArrowsDeg();
				this.setArrowsDeg();
			},

			getSpeedDiff: function() {

				this.initialSpeed = deviceSpeedVal.value;
				
				if (isNaN(this.initialSpeed)) this.initialSpeed = this.defaultSpeed;

				if (this.initialSpeed < this.minSpeed) this.initialSpeed = this.minSpeed;
				if (this.initialSpeed > this.maxSpeed) this.initialSpeed = this.maxSpeed;
				
				let speedRate = (1 - this.diamRate) * this.initialSpeed;
				this.realSpeed = (this.initialSpeed - speedRate).toFixed(1);
				
			},

			setSpeedDiff: function() {

				speedometer.childNodes[9].childNodes[3].value = this.initialSpeed;
				speedometer.childNodes[11].innerText = this.realSpeed;
			},

			getArrowsDeg: function() {

				this.initialDeg = this.initialSpeed - 120;
				this.realDeg = this.realSpeed - 120;

				if (this.realDeg < -120) {
					this.realDeg = -120;
				} else if (this.realDeg > 120) {
					this.realDeg = 120;
				}
			},

			setArrowsDeg: function() {

				speedometer.childNodes[5].childNodes[3].style.transform = 
					'rotateZ(' + this.initialDeg + 'deg)';
				speedometer.childNodes[7].childNodes[3].style.transform = 
					'rotateZ(' + this.realDeg + 'deg)';
			},

			measureBtnClick: function(target, prop, translate, measure) {
				measurement = measure;

				inchBtn.className = mmBtn.className = "change-out",
				target.className = "change-in";

				switcher.style.transform = "translateX(" + 
					translate + ")";
				
				tableMethods.setTableParams();
				tableMethods.setImageTitles();
			},

			speedBtnClick: function(target) {
				let longPress;

				function count() {
					target === up ? deviceSpeedVal.value++ : 
						deviceSpeedVal.value--;
					tableMethods.setSpeedParams();
				}

				target.addEventListener('click', function() {
					count();
				});
				
				target.addEventListener('mousedown', function() {
					longPress = window.setInterval(function() {
						count();
					}, 100);
				});

				target.addEventListener('mouseup', function() {
					clearInterval(longPress);
				});
						
			},

			speedValChange: function() {
				deviceSpeedVal.addEventListener('change', function() {
					tableMethods.setSpeedParams();
				});
			}, 
			calc: function() {

				tableMethods.getTableParams();
				tableMethods.setTableParams();

				tableMethods.getImageParams();
				tableMethods.setImageParams();

				tableMethods.setImageTitles();
				tableMethods.setImageTitlesWidth();
			
			
				tableMethods.setSpeedParams();
				
			}
		};

	window.addEventListener('load', function() {
		tableMethods.calc();
		tableMethods.speedBtnClick(up);
		tableMethods.speedBtnClick(down);
		tableMethods.speedValChange();

		inchBtn.addEventListener('click', function() {
		tableMethods.measureBtnClick(this, 
			tableMethods.inchProps, '100%', inchQuote);
		});
		mmBtn.addEventListener('click', function() {
			tableMethods.measureBtnClick(this, 
				tableMethods.mmProps, '0', mm);
		});
		calcBtn.addEventListener('click', function() {
			hiddenArea.style.display = 'block';
			tableMethods.calc();
		});
	});
	/*function long(go) {
		
		let framecount = 0;
		let fps, fpsInterval, startTime, now, then, elapsed;

		longPress(5)

		function longPress(fps) {
			fpsInterval = 1000 / fps;
			then = Date.now();
			startTime = then;
			console.log(startTime);
			count();
		}

		function count() {
			if (go === false) cancelAnimationFrame(count);
			requestAnimationFrame(count);
			now = Date.now();
			elapsed = now - then;

			if (elapsed > fpsInterval) {
				then = now - (elapsed % fpsInterval);

				let sinceStart = now - startTime;

				console.log((sinceStart / 1000 * 100)/100)

				target === up ? deviceSpeedVal.value++ : 
					deviceSpeedVal.value--;
				tableMethods.setSpeedParams();
			}
		}
	}*/

})();
