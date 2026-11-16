const baseUrl = 'https://api.hh.ru';

  function getVacancies() {
    axios.get(`${baseUrl}/vacancies`, {
        headers: {
            'HH-User-Agent': 'ThisIsAVacancyWidget/1.0 (passedbyabyss@gmail.com)'
        },
        params: {
            text: 'JavaScript',
            per_page: 10
        },
        timeout: 5000,
    })
      .then(response => {
        const vacancies = response.data.items;
        console.log(vacancies);
      })
      .catch(error => {
        console.error('Error fetching vacancies:', error);
      });
  }
  


function getCors() { 
    axios.get('https://api.hh.ru/cors', {
        headers: {
            'HH-User-Agent': 'ThisIsAVacancyWidget/1.0 (passedbyabyss@gmail.com)'
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error.response.data);
    });
}


getVacancies();
getCors();
