import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: {
        common: { type: String, required: true },
        official: { type: String, required: true },
        nativeName: { type: mongoose.Schema.Types.Mixed } 
    },
    independent: { type: Boolean, required: true },
    status: { type: String, required: true },
    unMember: { type: Boolean, required: true },
    currencies: { type: mongoose.Schema.Types.Mixed }, 
    capital: [{ type: String, required: true }],
    region: { type: String, required: true },
    subregion: { type: String },
    languages: [ String],
    latlng: [Number],
    landlocked: { type: Boolean, required: true },
    borders: [{ type: String, required: true }],
    area: { type: Number, required: true },
    flag: { type: String, required: true },
    maps: {
        googleMaps: { type: String },
        openStreetMaps: { type: String }
    },
    population: { type: Number, required: true },
    gini: { type: mongoose.Schema.Types.Mixed }, 
    fifa: { type: String },
    timezones: [String],
    continents: [String],
    flags: {
        png: { type: String },
        svg: { type: String },
        alt: { type: String }
    },
    startOfWeek: { type: String },
    capitalInfo: {
        latlng: [Number]
    },
    creador: { type: String, required: true },
}, {
    timestamps: true 
});

export default mongoose.model('Grupo-08', countrySchema, 'Grupo-08');
