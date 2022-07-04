import moment from 'moment';

export const isDate = (value: string) => {
    
    if(!value) {
        return false;
    }
    const fecha = moment(value);
    if(!fecha.isValid()) {
        return false;
    } else {
        return true;
    }
};
