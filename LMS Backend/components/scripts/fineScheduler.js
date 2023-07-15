const schedule = require('node-schedule');
const Rent = require('../models/RentBook');

const updateFineForOverdueRentals = async () => {
    const currentDate = new Date();

    const overdueRentals = await Rent.find({
        returndate: { $lt: currentDate },
        books: { $elemMatch: { returned: false } },
    });

    const filteredRentals = overdueRentals.filter((rental) => {
        return rental.books.some((book) => !book.returned);
    });

    filteredRentals.forEach(async (rental) => {
        for (const book of rental.books) {
            if (!book.returned) {
                const returnDate = new Date(book.returndate);
                const daysLate = Math.floor((currentDate - returnDate) / (24 * 60 * 60 * 1000));
                const fine = daysLate * 10;

                book.fine = Math.min(fine, 1500);
                book.returned = true;
            }
        }

        await rental.save();
    });

    console.log('Fine updated for overdue rentals.');
};

const job = schedule.scheduleJob('0 0 * * *', updateFineForOverdueRentals);
