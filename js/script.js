const personMaxCount = 67;
var id = 0;
var maleCount = 0;
var femaleCount = 0;

$.ajax({
    url: 'https://randomuser.me/api/?results=' + personMaxCount,
    dataType: 'json',
    success: function(dataPerson) {
        dataPerson.results.forEach(person => {
            $('#accordionExample').append(createCard(person));
            id++;
            if (person.gender === 'male') {
                maleCount++;
            } else {
                femaleCount++;
            }
        })
        //switch plus minus icon
        $('.accordion .card-header').on('click', function(){

        });
        //find by first name ???
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".card").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        createChart(maleCount, femaleCount);
    }
});

var createCard = function(person) {
    var card = `<div class="card">
		            <div class="card-header" id="heading${id}">
		               <div class="row" type="button" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
		                  <div class="col-1 main-info-class"><img src=${person.picture.thumbnail} class="rounded-circle" alt="photo"></img></div>
		                  <div class="col-2 main-info-class">${person.name.last}</div>
		                  <div class="col-2 main-info-class first-name1">${person.name.first}</div>
		                  <div class="col-2 main-info-class">${person.login.username}</div>
		                  <div class="col-2 main-info-class">${person.phone}</div>
		                  <div class="col-2 main-info-class">${person.location.state}</div>
		                  <div class="col-1 main-info-class"><img src="assets/img/plus.png" class="plus-icon plus-minus-icon" alt="plus"></div>
		               </div>
		            </div>
		            <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-parent="#accordionExample">
		               <div class="card-body">
		                  <div class="container">
	                        <div class="row first-name-class">${person.name.first}</div>
	                        <div class="row">
	                          <div class="col-3">
	                              <div class="row detail-info-class">Username &nbsp;<span class="personsData">${person.login.username}</span></div>
	                              <div class="row detail-info-class">Registered &nbsp;<span class="personsData">${person.registered.date}</span></div>
	                              <div class="row detail-info-class">Email &nbsp;<span class="personsData">${person.email}</span></div>
	                          </div>
	                          <div class="col-3">
	                              <div class="row detail-info-class">Adress &nbsp;<span class="personsData">${person.location.street.name} ${person.location.street.number}</span></div>
	                              <div class="row detail-info-class">City &nbsp;<span class="personsData">${person.location.city}</span></div>
	                              <div class="row detail-info-class">Zip Code &nbsp;<span class="personsData">${person.location.postcode}</span></div>
	                          </div>
	                          <div class="col-3">
	                              <div class="row detail-info-class">Birthday &nbsp;<span class="personsData">${person.dob.date}</span></div>
	                              <div class="row detail-info-class">Phone &nbsp;<span class="personsData">${person.phone}</span></div>
	                              <div class="row detail-info-class">Cell &nbsp;<span class="personsData">${person.cell}</span></div>
	                          </div>
	                          <div class="col-sm-3"><img src="${person.picture.large}" class="rounded-circle" alt="photo"></div>
	                     </div>
		               </div>
		            </div>
		         </div>`;
    return card;
}

var createChart = function(maleCount, femaleCount) {
    var ctx = $('#myChart');
    var labels = ['Male', 'Female'];
    var colors = ['blue', 'red'];

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [(maleCount * 100 / personMaxCount).toFixed(2), (femaleCount * 100 / personMaxCount).toFixed(2)],
                backgroundColor: colors
            }],
            labels: labels
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    formatter: (value) => {
                        return value.toString() + '%';
                    }
                }
            }
        }
    })
}