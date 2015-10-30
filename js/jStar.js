/**
 * Created by alexhartwell on 10/30/15.
 */


/**
 * jquery-stars.js v1.0
 * jQuery Magic cursor animation
 * @author Alexander Prokopenko <contact@justcoded.com> / http://justcoded.com
 * Copyright (c) 20011 Alexander Prokopenko - released under MIT License {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.

 * }}}
 */


(function($) {

    var jstar_timer = null;
    var jstar_index = 0;
    var jstar_dindex = 0;
    var jstar_image = null;

    $.jstars = {};
    $.fn.jstars = function(settings)
    {
        // check IE. only IE9+ support
        // apply default params
        settings = $.extend({}, $.fn.jstars.defaults, settings);
        // define frequency
        settings.frequency = 20 - Math.max(1, Math.min(settings.frequency, 19));
        // save in global
        $.jstars.settings = settings;

        return this.each(
            function()
            {
                // preprocess
                if( !jstar_timer ){
                    // init timer
                    jstar_timer = setInterval(jstar_uptade_star_bg, settings.delay / 9);
                    // init image
                    jstar_image = new Image();
                    jstar_image.src = settings.image_path + '/' + settings.image;
                }

                // hover event
                $(this).mousemove(function(e){
                    if( (jstar_dindex++ % settings.frequency) != 0) return;

                    // define what side we need to show stars:
                    var sideX = jstar_rand(-1,1);
                    var sideY = jstar_rand(-1,1);

                    var randX = jstar_rand(5, 5);
                    var randY = jstar_rand(5, 5);

                    var opacity = Math.min(Math.random() + 0.4, 1);

                    // calculate coordinate
                    var x = e.pageX + (sideX * randX);
                    var y = e.pageY + (sideY * randY);

                    // show span and launch animate
                    var id = 'jstar_' + jstar_index++;

                    // append style
                    if( settings.style != 'rand' ){
                        var bg_pos = '0px ' + settings.style_map[ settings.style ] + 'px';
                    }
                    else{
                        var ind = jstar_rand(0, 5);
                        var i = 0;
                        for(var key in settings.style_map){
                            if( i++ == ind ){
                                var bg_pos = '0px ' + settings.style_map[ key ] + 'px';
                                break;
                            }
                        }
                    }

                    var span = '<span id="' + id + '" class="jstar_span" style="display:block; width:27px; height:27px; background:url('+jstar_image.src+') no-repeat '+bg_pos+'; margin:0; padding:0; position:absolute; top:-50px; left:0;">&nbsp;</span>';
                    $(document.body).append(span);

                    var star = $('#' + id);
                    star
                        .css({
                            top: y,
                            left: x,
                            'opacity': opacity
                        })
                        .animate({ opacity: 0 }, 750, function(){ star.remove(); }); // remove span on finish animate*/
                })
            }
        )
    };

    /**
     * helper functions
     */

// timer function
    function jstar_uptade_star_bg(){
        if( ! $('span.jstar_span').size ) return;

        $('span.jstar_span').each(function(){
            var bg_pos = $(this).css('background-position').split(' ');
            var bg_pos_x = parseInt(bg_pos[0]);
            var bg_pos_y = parseInt(bg_pos[1]);
            $(this).css('background-position', (bg_pos_x - $.jstars.settings.width) + 'px ' + bg_pos_y + 'px');
        })
    }

// math rand in interval
    function jstar_rand(from, to){
        var r = Math.random();
        r = r * (to - from);
        r = r + from;
        r = Math.round(r);
        return r;
    }

    $.fn.jstars.defaults = {
        image_path: '', // this is requried param
        image: 'jstar-map.png', // this is requried param
        style: 'white',
        frequency: 12,
        style_map: {
            white: 0,
            blue: -27,
            green: -54,
            red: -81,
            yellow: -108
        },
        width: 27,
        height: 27,
        delay: 750
    };


})(jQuery);