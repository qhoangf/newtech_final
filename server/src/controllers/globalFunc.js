const globalFunction = {
  EmptyCheck: (request) => {
    try {
      let emptyValues = [];

      for (const key in request.body) {
        if (Object.hasOwnProperty.call(request.body, key)) {
          const value = request.body[key];

          if (value === "") {
            console.log(value);
            emptyValues.push(key);
          }
        }
      }

      if (emptyValues.length > 0) {
        const emptyValuesMessage = emptyValues.join(", ");
        return {
          isValid: false,
          message: `Empty values in: ${emptyValuesMessage}`,
        };
      }

      return { isValid: true };
    } catch {
      return { isValid: false, message: "Request body's key(s) is/are invalid" };
    }
  },
};

module.exports = globalFunction;
