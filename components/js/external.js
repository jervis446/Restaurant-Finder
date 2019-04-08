function changePage()
			{
				var getPageUrl=new URL(window.location.href);
				var getPage=parseInt(getPageUrl.searchParams.get("page"))
				var cityId=parseInt(getPageUrl.searchParams.get("id"))
				location.replace(`?id=${cityId}&page=${getPage+1}`)
			}


var getPageUrl=new URL(window.location.href);
var getPage=parseInt(getPageUrl.searchParams.get("page"))
document.getElementById('1').classList.remove("option");
document.getElementById('2').classList.remove("option");
document.getElementById('3').classList.remove("option");
document.getElementById(''+getPage).classList.add("option");
