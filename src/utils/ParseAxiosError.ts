import { AxiosError } from 'axios';

interface ParsedError {
  title: string;
  message: string;
}

const ParseAxiosError = (error: AxiosError | any): ParsedError => {
  let parsedError: ParsedError = {
    title: 'Oops Error',
    message: 'Something went wrong. Please try again later.',
  };

  if (error.isAxiosError) {
    if (error.response) {

      if (error.response.status === 404) {
        parsedError.title = 'Pokemon Not Found';
        parsedError.message = `The pokemon you are looking for is either missing or temporary unavailable!`;
      } else {
        parsedError.title = 'Server Error';
        parsedError.message = `The server returned an unexpected response (HTTP ${error.response.status}).`;
      }
    } else if (error.request) {

      parsedError.title = 'No Response';
      parsedError.message = 'No response received from the server. Please check your network connection.';
    } else {

      parsedError.title = 'Request Error';
      parsedError.message = `There was an issue with the request: ${error.message}`;
    }
  } else {

    parsedError.title = 'Network Error';
    parsedError.message = 'There was a problem with the network connection or an invalid request.';
  }

  return parsedError;
};

export default ParseAxiosError;
