// Generated by CoffeeScript 1.3.1
(function() {
	var RDF, __bind = function(fn, me) {
		return function() {
			return fn.apply(me, arguments);
		};
	}, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
		for (var key in parent) {
			if (__hasProp.call(parent, key))
				child[key] = parent[key];
		}
		function ctor() {
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child;
	};

	window.LDPlugin = (function(_super) {

		__extends(LDPlugin, _super);

		LDPlugin.name = 'LDPlugin';

		function LDPlugin() {
			this.init = __bind(this.init, this);
			return LDPlugin.__super__.constructor.apply(this, arguments);
		}


		LDPlugin.prototype.init = function() {
			var annotation, loadAnnotation, _i, _len, _ref, _results, _this = this;
			console.info("Initialize LDPlugin");
			loadAnnotation = function(annotation) {
				var requestUrl;
				requestUrl = "" + _this.lime.options.annotFrameworkURL + "meta/application/json?uri=" + (encodeURIComponent(annotation.resource.value));
				// --- Teporary resoning due to DBPedia endpoint issues
				// ----------------------- Begin
				var annotationResourceValue = annotation.resource.value;
				if (annotationResourceValue.indexOf("Flachau") > 0) {
					requestUrl = "cache/Flachau.json";
				}
				if (annotationResourceValue.indexOf("Inline_hockey") > 0) {
					requestUrl = "cache/Inline_hockey.json";
				}
				if (annotationResourceValue.indexOf("Snowshoe") > 0) {
					requestUrl = "cache/Snowshoe.json";
				}
				if (annotationResourceValue.indexOf("Mountainbiking") > 0) {
					requestUrl = "cache/Mountain_biking.json";
				}
				if (annotationResourceValue.indexOf("Freeskiing") > 0) {
					requestUrl = "cache/Freeskiing.json";
				}
				if (annotationResourceValue.indexOf("Downhill_mountain_biking") > 0) {
					requestUrl = "cache/Downhill_mountain_biking.json";
				}
				if (annotationResourceValue.indexOf("Beach_volleyball") > 0) {
					requestUrl = "cache/Beach_volleyball.json";
				}
				if (annotationResourceValue.indexOf("Skateboarding") > 0) {
					requestUrl = "cache/Skateboarding.json";
				}
				if (annotationResourceValue.indexOf("Trampoline") > 0) {
					requestUrl = "cache/Trampoline.json";
				}
				if (annotationResourceValue.indexOf("Mountains_of_Salzburg") > 0) {
					requestUrl = "cache/Mountains_of_Salzburg.json";
				}
				if (annotationResourceValue.indexOf("Cross-country_skiing") > 0) {
					requestUrl = "cache/Cross-country_skiing.json";
				}
				if (annotationResourceValue.indexOf("Sledding") > 0) {
					requestUrl = "cache/Sledding.json";
				}
				if (annotationResourceValue.indexOf("Zorbing") > 0) {
					requestUrl = "cache/Zorbing.json";
				}
				if (annotationResourceValue.indexOf("Nordic_skating") > 0) {
					requestUrl = "cache/Tour_skating.json";
				}
				if (annotationResourceValue.indexOf("Tepidarium") > 0) {
					requestUrl = "cache/Tepidarium.json";
				}
				if (annotationResourceValue.indexOf("Sauna") > 0) {
					requestUrl = "cache/Sauna.json";
				}
				if (annotationResourceValue.indexOf("Rafting") > 0) {
					requestUrl = "cache/Rafting.json";
				}
				if (annotationResourceValue.indexOf("Snowboarding") > 0) {
					requestUrl = "cache/Snowboarding.json";
				}
				if (annotationResourceValue.indexOf("Canyoning") > 0) {
					requestUrl = "cache/Canyoning.json";
				}
				
				// ----------------------- End
				return jQuery.ajax({
					url : requestUrl,
					success : function(res) {
						//console.log(annotation.resource.value + " - " + res);
						//  if (_.keys(res).length) {
						if (res.length) {
						//	console.log(annotation.resource.value + " - " + res);
							annotation.entity = jQuery.parseJSON(res);
							annotation.ldLoaded = true;
							return jQuery(annotation).trigger(jQuery.Event("ldloaded", {
								entity : res
							}));
						}
					},
					error : function(err) {
						return console.error(arguments);
					}
				});
			};
			_ref = this.lime.annotations;
			_results = [];
			for ( _i = 0, _len = _ref.length; _i < _len; _i++) {

				annotation = _ref[_i];
			//	console.log("loading annotation: " + _i + " = " + annotation.resource.value);
				_results.push(loadAnnotation(annotation));
			}
			return _results;
		};

		return LDPlugin;

	})(window.LimePlugin);

	RDF = (function() {

		RDF.name = 'RDF';

		function RDF(hash) {
		}

		return RDF;

	})();

}).call(this);