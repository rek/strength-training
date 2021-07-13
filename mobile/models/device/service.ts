import axios from "axios";

export const start = () => {
  axios
    .get("http://192.168.1.1:80/start")
    .then((response) => {
      console.log("Start response", response);
    })
    .catch((response) => {
      console.log("Error response from start", response);
    });
};

export const checkIfCalibrated = () => {
  return axios
    .get("http://192.168.1.1:80/isCalibrated")
    .then((response) => {
      console.log("isCalibrated response", response);
      return response.data;
    })
    .catch((response) => {
      console.log("Error response from isCalibrated", response);
    });
};

export const status = () => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject();
    }, 1000);

    axios
      .get("http://192.168.1.1:80/_status")
      .then((response) => {
        clearTimeout(timer);
        console.log("Status response", response);
        resolve(response);
      })
      .catch((response) => {
        console.log("Error response from status", response);
        reject();
      });
  });
};

// const handleClickResult = () => {
//   axios
//     .get("http://192.168.1.1:80/get")
//     .then((response) => {
//       console.log("Get response", response);
//     })
//     .catch((response) => {
//       console.log("Error response", response);
//     });
// };

export const stop = (): Promise<{
  data: any;
  error: boolean;
  errorMessage?: string;
}> =>
  axios
    .get("http://192.168.1.1:80/stop")
    .then((response) => {
      console.log("Stop response", response);
      try {
        // have some trouble making this nice in the hardware
        // so easier to fix the hack here:
        const cleanData = response.data.replace(",]}", "]}");
        const result = JSON.parse(cleanData);
        if (result) {
          console.log("data", result);
          return {
            data: result.data,
            error: false,
          };
        } else {
          return {
            data: false,
            error: true,
            errorMessage: "Error: No result",
          };
        }
      } catch (e) {
        return {
          data: false,
          error: true,
          errorMessage: `Error: ${e}`,
        };
      }
    })
    .catch((response) => {
      return {
        data: false,
        error: true,
        errorMessage: `Error response: ${response}`,
      };
    });
