// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.DBPediaInfoPlugin = (function(_super) {

    __extends(DBPediaInfoPlugin, _super);

    function DBPediaInfoPlugin() {
      return DBPediaInfoPlugin.__super__.constructor.apply(this, arguments);
    }

    DBPediaInfoPlugin.prototype.init = function() {
      var annotation, _i, _len, _ref, _results,
        _this = this;
      this.name = 'DBPediaInfoPlugin';
      console.info("Initialize " + this.name);
      _ref = this.lime.annotations;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        annotation = _ref[_i];
        jQuery(annotation).bind("becomeActive", function(e) {
          var widget;
          annotation = e.target;
          if (annotation.resource.value.indexOf("geonames") < 0) {
            widget = _this.lime.allocateWidgetSpace(_this, {
              thumbnail: "img/info.png",
              title: "" + (annotation.getLabel()) + " Info"
            });
            if (widget) {
              widget.annotation = annotation;
              if (annotation.ldLoaded) {
                widget.show();
              } else {
                jQuery(annotation).bind("ldloaded", function(e) {
                  annotation = e.target;
                  return widget.show();
                });
              }
              jQuery(widget).bind('activate', function(e) {
                annotation = e.target.annotation;
                return _this.displayModal(annotation);
              });
            }
            return annotation.widgets[_this.name] = widget;
          }
        });
        _results.push(jQuery(annotation).bind("becomeInactive", function(e) {
          var widget;
          annotation = e.target;
          widget = annotation.widgets[_this.name];
          if (widget) {
            widget.deactivate();
          }
        }));
      }
      return _results;
    };

    DBPediaInfoPlugin.prototype.showAbstractInModalWindow = function(annotation, modalContainer) {
      var comment, depiction, label, lime, modalContent, page, result;
      label = annotation.getLabel();
      page = annotation.getPage();
      lime = this.lime;
      comment = annotation.getDescription();
      depiction = annotation.getDepiction();
      result = "<div id=\"listContainer\" style=\"position:relative; float: left; z-index: 10; width:35%; height: 95%; background: white; box-shadow: rgba(85,85,85,0.5) 0px 0px 24px;\" >" + "<img src=\"" + depiction + "\" style=\"display: block; width: auto; max-height: 300px; max-width:90%; margin-top: 30px; margin-left: auto;  margin-right: auto; border: 5px solid black; \" >" + "</div>" + "<div id=\"displayArea\" style=\"position:relative; float: left; z-index: 1; width: 65%; height:95%; background: #DBDBDB; overflow: auto;\">" + "<p style=\"margin-left: 10px; font-size: 22px; text-align: left; color:black; font-family: 'Share Tech', sans-serif; font-weight: 400;\">" + comment + "</p>" + "</div>";
      modalContent = $("#modalContent");
      return $(modalContent).append(result);
    };

    DBPediaInfoPlugin.prototype.displayModal = function(annotation) {
      var mask, maskHeight, maskWidth, modalcontainer, winH, winW,
        _this = this;
      if (this.lime.player.isFullScreen) {
        modalcontainer = $(".modalwindow");
      } else {
        modalcontainer = $("#modalWindow");
      }
      mask = void 0;
      if (this.lime.player.isFullScreen) {
        mask = $(".mask");
      } else {
        mask = $("#mask");
      }
      $(modalcontainer).css("height", "70%");
      $(modalcontainer).css("max-height", "500px");
      $(modalcontainer).empty();
      $(modalcontainer).append("<a href=\"#\" class=\"close\" role=\"button\"><img src=\"img/close-icon.png\" style=\"width: 22px; height: 22px;\"/></a>");
      $(modalcontainer).append("<div id=\"modalContent\" style=\"height: 95%; width: 100%; position: relative; margin: 0 auto;\">");
      $(modalcontainer).append("</div>");
      maskHeight = $(window).height();
      maskWidth = $(window).width();
      $(mask).css({
        width: maskWidth,
        height: maskHeight
      });
      $(mask).fadeIn(100);
      $(mask).fadeTo("fast", 0.8);
      winH = $(window).height();
      winW = $(window).width();
      $(modalcontainer).css("top", winH / 2 - $(modalcontainer).height() / 2);
      $(modalcontainer).css("left", winW / 2 - $(modalcontainer).width() / 2);
      $(modalcontainer).fadeIn(100);
      $(".close").click(function(e) {
        e.preventDefault();
        $(mask).hide();
        $(modalcontainer).hide();
        return $(modalcontainer).empty();
      });
      $(mask).click(function(e) {
        $(_this).hide();
        $(modalcontainer).hide();
        return $(modalcontainer).empty();
      });
      $(window).resize(function(e) {
        maskHeight = $(document).height();
        maskWidth = $(document).width();
        $(mask).css({
          width: maskWidth,
          height: maskHeight
        });
        winH = $(window).height();
        winW = $(window).width();
        $(modalcontainer).css("top", winH / 2 - $(modalcontainer).height() / 2);
        return $(modalcontainer).css("left", winW / 2 - $(modalcontainer).width() / 2);
      });
      return this.showAbstractInModalWindow(annotation, modalcontainer);
    };

    return DBPediaInfoPlugin;

  })(window.LimePlugin);

}).call(this);
