class ZOMATO {
constructor(id) {
	// this.api = "e9f9f63865808f1ceb3563996c2eb3a2"; //api daily limit exceed Please Use Your if you face Problem
	this.api = "cb71eec4d77485f325859e0ee6f9c304";
	this.url=new URL(window.location.href)
	this.id=parseInt(this.url.searchParams.get("id"))
	this.page=parseInt(this.url.searchParams.get("page"))

	//header detail
	this.header = {
		method:"GET",
		headers: {
			"user-key":this.api,
			"Content-Type":"application/json",
		},
		credentials: "same-origin"
	};
}

async searchAPI(){

	//search restaurant
	var restaurantURL = new URL(`https://developers.zomato.com/api/v2.1/search?entity_type=city&sort=rating&order=desc&entity_id=${this.id}&
		start=${this.page*5}&count=5`)

	const restaurantInfo = await fetch(restaurantURL,this.header);
	const restaurantJSON = await restaurantInfo.json();
	const restaurantList = await restaurantJSON.restaurants;

return {
	restaurantList
	};
 }
}

function UI(data) {
	const show=document.getElementById("list");
	data.restaurantList.forEach(async (res)=>{
	var parser = new DOMParser();
	var reviewsURL = new URL(`https://developers.zomato.com/api/v2.1/reviews?res_id=${res.restaurant.id}`)
	
	//review Info
	const reviewsInfo = await fetch(reviewsURL,{
		method:"GET",
		headers: {
			// "user-key":'e9f9f63865808f1ceb3563996c2eb3a2',
			"user-key":'cb71eec4d77485f325859e0ee6f9c304',
			"Content-Type":"application/json",
		},
		credentials: "same-origin"
	});
	
	const reviewsJSON = await reviewsInfo.json();	
	show.append(parser.parseFromString(`	
		<div class="container1" style="background-color:#fff;">
			<a href="../Locator/locator.html?id=${res.restaurant.id}">
			<img class="img-response" src="${res.restaurant.featured_image}" alt="Smiley face">
				<div class="innercontainer">
			    <span class="menu-item-title"><h2>${res.restaurant.name}</h2></span>
			    <span><h6>${res.restaurant.location.address}</h6></span>
			    <p class="menu-item-details"><img src="../components/img/03.png" height="21" width="21"/>${res.restaurant.user_rating.aggregate_rating}
			    	|  (${res.restaurant.user_rating.votes}Votes) ${reviewsJSON.reviews_count}
			    </p>
			</div>
			<hr>
		</div>
		`,"text/html").body.firstElementChild
	
	)
	
})
	var parser = new DOMParser();
	document.getElementById("bigmain").append(parser.parseFromString(`	
		<section class="Button">
		
		<center style="margin-bottom:50px;">
			<a onclick="changePage()" id="1">1</a>
			<a onclick="changePage()" id="2">2</a>
			<a onclick="changePage()" id="3">3</a>
		</center>
	</section>
		`,"text/html").body.firstElementChild

	)
}

(function() {
	const zomato = new ZOMATO();	
	document.addEventListener("DOMContentLoaded", () => {
		zomato.searchAPI().then(data => UI(data));
	});
})();





















