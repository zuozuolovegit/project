(function(G_j){
    G_j.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            //outDuring: 200,
            hoverEvent: function(){
                G_j.noop();
            },
            outEvent: function(){
                G_j.noop();    
            }
        };
        var sets = G_j.extend(defaults,options || {});
        var hoverTimer, outTimer, that = this;
        return G_j(this).each(function(){
            G_j(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
            });    
        });
    }      
})(jQuery_G_j);