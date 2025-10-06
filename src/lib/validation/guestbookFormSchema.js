import * as v from 'valibot';

export const guestbookFormSchema = v.object({
	id: v.pipe(v.string(), v.uuid('유효한 UUID 형식이 아닙니다.')),
	name: v.pipe(
		v.string(),
		v.minLength(2, '이름은 두 자 이상 열 여섯자 미만으로 작성하세요'),
		v.maxLength(16, '이름은 두 자 이상 열 여섯자 미만으로 작성하세요')
	),
	message: v.pipe(
		v.string(),
		v.minLength(1, '메시지는 한 자 이상 128자 미만으로 작성하세요'),
		v.maxLength(128, '메시지는 한 자 이상 128자 미만으로 작성하세요')
	)
});
