

export const findRoutes = (routes) => {
   routes = routes.sort((a, b) => a.summary.diffs.cheapest - b.summary.diffs.cheapest);
let result ={}
  if (routes.length === 1) {
    result.cheapest = routes[0];
    result.fastest = routes[0];
    result.others = routes[0];
    return result;
  }
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].summary.diffs.cheapest === 0) {
      result.cheapest = routes[i];
    }
    if (routes[i].summary.diffs.fastest === 0) {
      result.fastest = routes[i];
    }
    if(routes.length > 1 && result.cheapest === result.fastest){
        result.others = routes[1]
    }else if(routes.length > 2){
        result.others = routes[2]
    }else{
        result.others = result.cheapest
    }
  }
//   console.log("result of to getrouteIndfo function : ",result);
  return result
};

