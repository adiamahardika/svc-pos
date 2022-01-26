export const createLog = async (request, response) => {
  try {
    console.log("request");
    console.log(request.body);
    console.log("response");
    console.log(response.statusCode);
    console.log(response.body);
  } catch (error) {
    console.log(error);
    standardResponse(response, 400, error_RC, error.toString());
  }
};
