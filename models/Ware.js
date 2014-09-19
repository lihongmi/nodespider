var mongoose = require( 'mongoose' );
module.exports =mongoose.model( 'Ware', {
    issue    : String,
    result    : String
} );