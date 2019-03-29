class ZOMATO {
constructor(id) {
	this.api = "e9f9f63865808f1ceb3563996c2eb3a2";  
	this.url=new URL(window.location.href)
	this.id=parseInt(this.url.searchParams.get("id"))

	//header Info
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
var restaurantURL = new URL(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.id}`)
	const restaurantInfo = await fetch(restaurantURL,this.header);
	const restaurantJSON = await restaurantInfo.json();

//cuisine Info
var cuisinesURL = new URL(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${restaurantJSON.location.city_id}&start=${0}&count=5`)
	const cuisinesInfo = await fetch(cuisinesURL,this.header);
	const cuisinesJSON = await cuisinesInfo.json();

//review Info
var reviewsURL = new URL(`https://developers.zomato.com/api/v2.1/reviews?res_id=${this.id}`)
	const reviewsInfo = await fetch(reviewsURL,this.header);
	const reviewsJSON = await reviewsInfo.json();	


return {
	cuisinesJSON,
		restaurantJSON,
		reviewsJSON
	};
  }
} 

function UI(data) {

	const restName=document.getElementById("rname");
	const {name,user_rating,featured_image,average_cost_for_two,location:{locality_verbose}} =data.restaurantJSON;
	restName.innerHTML = name;
    const rating=document.getElementById("rate");
	const {reviews_count} =data.reviewsJSON;

	rating.innerHTML = `<img src="../components/img/03.png" height="23" width="23"/> ${user_rating.aggregate_rating} (${user_rating.votes}Votes) &nbsp;&nbsp;|&nbsp;&nbsp; ${reviews_count}Reviews`
	const picture = document.getElementById("first_box");
	picture.style.backgroundImage = `url('${featured_image}')`;

	//price Info
	const cost=document.getElementById("cost");
	cost.innerHTML = `${average_cost_for_two} INR` ;


	//locality Info
	const address=document.getElementById("address");
	address.innerHTML = locality_verbose;

	const cuisineList=document.getElementById("menu_inner");
		var parser = new DOMParser();

	data.cuisinesJSON.cuisines.slice(0,3).forEach((cuisine,index) => {
	cuisineList.append(
			parser.parseFromString(`
				<div>
				<p id="item${index+1}">${cuisine.cuisine.cuisine_id} : ${cuisine.cuisine.cuisine_name}</p>
				
				</div>
			`,"text/html").body.firstElementChild
		)
	});

	const reviewsList=document.getElementById("inner_box5");
		var parser = new DOMParser();

	data.reviewsJSON.user_reviews.forEach((reviews,index) => {
	reviewsList.append(
			parser.parseFromString(`
				<div>
				<section id="cir" style="background-image:url(${reviews.review.user.profile_image})"> </section>
				<section id="info">
				<h1>${reviews.review.user.name}</h1>
				<img src="../components/img/03.png" height="23" width="23"/><img src="../components/img/03.png" height="23" width="23"/><img src="../components/img/03.png" height="23" width="23"/><img src="../components/img/03.png" height="23" width="23"/><img src="../components/img/04.png" height="23" width="23"/>
				<p>${reviews.review.review_text}</p>
			</section>
			<hr id="small">
			
			`,"text/html").body.firstElementChild
		)
	});
}

(function() {
	const zomato = new ZOMATO();	
	document.addEventListener("DOMContentLoaded", () => {
		zomato.searchAPI().then(data => UI(data));
	});
})();