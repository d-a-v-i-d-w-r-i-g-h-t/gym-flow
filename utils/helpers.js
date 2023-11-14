module.exports = {
    formatDate: (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`
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