import { useEffect, useState } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';

import InputErrorMsg from './ui/InputErrorMsg';
import InputLabel from './ui/InputLabel';

import { cn } from '@/utils/classNames';

interface FileUploadInputProps {
  label?: string;
  name?: string;
  thumbnailUrl?: string;
  isRequired?: boolean;
  errorMsg?: string;
  register?: UseFormRegisterReturn;
  onChange?: (files: FileList | null) => void;
}

const FileSingleUploadInput = ({
  label,
  name,
  thumbnailUrl,
  isRequired,
  errorMsg,
  register,
  onChange,
}: FileUploadInputProps) => {
  const [thumbnail, setThumbnail] = useState('');
  const [isEditFile, setIsEditFile] = useState(false);

  const isThumbnailUrl = !!(typeof thumbnailUrl === 'string' && thumbnailUrl);

  const fileEditClass = isEditFile
    ? 'z-2 *:text-white *:fill-white'
    : 'bg-[#DED9CA] *:text-[#7c7c7c] *:fill-[#7c7c7c]';

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    if (files) {
      const thumbnail = URL.createObjectURL(files[0]);
      setThumbnail(thumbnail);

      if (onChange) onChange(files);
    }
  };

  useEffect(() => {
    // 썸네일 변경 시 이전 URL 해제 (메모리 누수 방지)
    return () => URL.revokeObjectURL(thumbnail);
  }, [thumbnail]);

  return (
    <div className='flex flex-col items-start'>
      {label && <InputLabel>{label}</InputLabel>}

      <div
        className='invalid:border-invalid relative aspect-square w-full max-w-[200px] overflow-hidden rounded-md border border-solid border-gray-100 focus-within:border-gray-400'
        onMouseLeave={() => {
          if (isThumbnailUrl || thumbnail) setIsEditFile(false);
        }}
        onMouseEnter={() => {
          if (isThumbnailUrl || thumbnail) setIsEditFile(true);
        }}
      >
        {(thumbnail || isThumbnailUrl) && (
          <img
            src={thumbnail ? thumbnail : thumbnailUrl || ''}
            alt='file-thumbnail'
            className='absolute z-1 h-full w-full bg-white object-cover'
          />
        )}

        <label
          htmlFor={register?.name || name}
          className={cn(
            'absolute top-0 left-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2',
            fileEditClass,
          )}
        >
          <FaCamera />
          <span className='text-xs font-bold'>{isEditFile ? '사진 변경' : '사진 추가'}</span>

          {isEditFile && (
            <div className='absolute top-0 left-0 z-[-1] h-full w-full bg-black opacity-60' />
          )}
          <input
            type='file'
            id={register?.name || name}
            name={register?.name || name}
            className='absolute -top-1 -left-1 h-1 w-1 overflow-hidden'
            accept='image/*'
            required={register?.required || isRequired}
            onChange={(e) => {
              onChangeFile(e);
              register?.onChange?.(e);
            }}
            ref={register?.ref}
            onBlur={register?.onBlur}
          />
        </label>
      </div>
      {errorMsg && <InputErrorMsg>{errorMsg}</InputErrorMsg>}
    </div>
  );
};

export default FileSingleUploadInput;
