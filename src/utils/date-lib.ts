
export const incrementDateTime = (dateValue: Date, incrementBy: number, incrementType: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days') => {
    let result = null
    switch(incrementType) {
        case 'milliseconds':
            result = new Date(dateValue.getTime() + incrementBy)
            break;
        case 'seconds':
            result = new Date(dateValue.getTime() + incrementBy * 1000)
            break;
        case 'minutes':
            result = new Date(dateValue.getTime() + incrementBy * 60 * 1000)
            break;
        case 'hours':
            result = new Date(dateValue.getTime() + incrementBy * 60 * 60 * 1000)
            break;
        case 'days':
            result = new Date(dateValue.getTime() + incrementBy * 24 * 60 * 60 * 1000)
            break;
    }
    return result
}

const DateUtils = { incrementDateTime }

export default DateUtils;
