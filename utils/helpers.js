module.exports = {
    formatDate: (date) => {
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    },

    // add loggedIn state to each routine data set for use on Discover page
    eachWithLoggedIn: function (array, loggedIn, options) {
        let result = '';

        for (let i = 0; i < array.length; i++) {

            const context = Object.assign({}, array[i], { loggedIn });
            result += options.fn(context);
        }
        return result;
    },

}