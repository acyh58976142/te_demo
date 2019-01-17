(function($) {
    $.fn.HJPage = function(config) {

        if (this.size() != 1)
            $.error('error');
        
        var c = {
        	pageSize : 20,//
        	total : 0,
			showPages: 5, //显示出来的页数，除了第一页和最后一页其余的用...代替
			totalPages : 1,//总页数
        	onPageClicked : null,
        	pageNo: 1
        	
        };
        if (config) $.extend(c, config);
        
        if(c.pageNo > 1) {
        	return; // yes , not do.
        }
        
        var  preBtn, nextBtn;
        
        (function($this) {
            if (c.showPages<5)
				$.error("显示页码不能小于5");
            init(c.pageNo);
            bindALL();
            
            function init(position) {
            	$this.empty();
            	c.totalPages = Math.ceil(c.total/c.pageSize);
            	var prefix = parseInt(c.showPages/2);
				var suffix = parseInt(c.showPages/2);
				var realsuffix = suffix;
            	if(c.totalPages < 1) return; 
				if (position<1)
				$.error("页码不能小于1");
            	if(position==1){
					$this.append('<li class="disabled"><a class="pre" href="###">上一页</a></li>');
        		}else{
					
					$this.append('<li><a class="pre" href="###">上一页</a></li>');
				}
				var index=1;
				var pNum = 0;
				if(position>=c.showPages){
					
					
					if(position==c.totalPages){
						index = position - prefix - suffix;
						pNum = index - 1;
					}else if(position==3){
						index = position;
						pNum = index - 1;
						realsuffix = suffix+prefix;
					}else if(position+suffix>c.totalPages){
						index = c.totalPages-c.showPages+1;
						pNum = index - 1;
					}else{
					index = position - prefix;
						pNum = index - 1;
					}
					if(index>2){
					$this.append('<li class="page" pNum="'+1+'"><a href="###" page="'+1+'">'+1+'</a></li>');
					$this.append('<li class="disable" ><a href="###" >'+'...'+'</a></li>');
					}else{
						index=1;
						pNum=0;
					}
					
				}
        		
        		for(; index <= c.totalPages; index++) {
        			pNum++;
					if(c.totalPages > c.showPages){
						if(position<c.showPages){
						if(index==c.showPages+1&&index!=c.totalPages){
							$this.append('<li class="disable" ><a href="###" >'+'...'+'</a></li>');
							continue;
						}else if(index==c.showPages+2){
							$this.append('<li class="page" pNum="'+c.totalPages+'"><a href="###" page="'+c.totalPages+'">'+c.totalPages+'</a></li>');
							break;
						}
						}else{

						if((index==position+realsuffix+1)&&index!=c.totalPages){
							$this.append('<li class="disable" ><a href="###" >'+'...'+'</a></li>');
							continue;
						}else if(index>position+realsuffix+1){
							$this.append('<li class="page" pNum="'+c.totalPages+'"><a href="###" page="'+c.totalPages+'">'+c.totalPages+'</a></li>');
							break;
						}
						}
						$this.append('<li class="page" pNum="'+pNum+'"><a href="###" page="'+index+'">'+index+'</a></li>');
					}else{
        				$this.append('<li class="page" pNum="'+pNum+'"><a href="###" page="'+index+'">'+index+'</a></li>');
					}
					
        		}
        		
        		$this.append('<li class="disabled"><a class="next" href="###">下一页</a></li>');
        		
        		
        		if(position==c.totalPages) {
        			$this.find('li a.next').parent().addClass("disabled");
            		
            	}else {
            		$this.find('li a.next').parent().removeClass("disabled");
            		
            	}
			
				$this.find('li.page').find('a[page="'+position+'"]').parent().addClass("active");
        	
        		preBtn = $this.find('li a.pre').parent();
        		nextBtn = $this.find('li a.next').parent();
            }
            
       
            
            function onClickPage(pageBtn) {
            	
            	var currentIndex = parseInt(pageBtn.text());//当前点击的页面
            	init(currentIndex);
				bindALL();

            	if(c.onPageClicked) {
            		c.onPageClicked.call(this, $this, currentIndex);
            	}
            	
            }
            
            function onPageBtnClick($_this) {
            	var selectedText = $_this.text();
            	var selectedBtn = $this.find('li.active').find('a');
            	if(selectedText == '下一页') {
            		
            		var selectedIndex = parseInt(selectedBtn.text())+1;//上一次选中的页数再加一页
            	
            		if(selectedIndex <= c.totalPages&&selectedIndex > 0) {
            			selectedBtn = $this.find('li.page').find('a[page="'+(selectedIndex)+'"]');
            		}
				
            	}else if(selectedText == '上一页') {
            		var selectedIndex = parseInt(selectedBtn.text())-1;
            		if(selectedIndex <= c.totalPages&&selectedIndex > 0) {
            			selectedBtn = $this.find('li.page').find('a[page="'+(selectedIndex)+'"]');
					}
					
            	}else {
            		selectedBtn = $_this;
            	}
            	
            	onClickPage(selectedBtn);
            }
            
            function bindALL() {
            	$this.find("li.page a,li a.pre,li a.next").each(function() {
            		if($(this).parent().hasClass('disabled')) return;
            		if($(this).parent().hasClass('active')) return;
            		
            		$(this).on('pageClick', function(e) {
            			onPageBtnClick($(this));
            		});
                });
            	
                $this.find("li.page a,li a.pre,li a.next").click(function(e) {
                	e.preventDefault();
                	
                	if($(this).parent().hasClass('disabled')) return;
            		if($(this).parent().hasClass('active')) return;
            		
                	$(this).trigger('pageClick', e);
                });
            }
        })(this);
    };
})(jQuery);