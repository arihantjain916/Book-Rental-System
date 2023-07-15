const schedule = require('node-schedule');
const Rent = require('../models/RentBook');

const updateFineForOverdueRentals = async () => {
    const currentDate = new Date();

    const overdueRentals = await Rent.findOne({
        books: { $elemMatch: { returned: false } },
    });

    if (overdueRentals) {
        const filteredRentals = await overdueRentals.books.map((book) => {
            if (!book.returned && new Date(book.returndate) < currentDate) {
                const returnDate = new Date(book.returndate);
                const daysLate = Math.floor((currentDate - returnDate) / (24 * 60 * 60 * 1000));
                const fine = daysLate * 10;

                book.fine = fine;
            }

            return book;
        });

        await overdueRentals.save();

        console.log('Fine updated for overdue rentals.');
    }
};

const job = schedule.scheduleJob('0 0 * * *', updateFineForOverdueRentals);
