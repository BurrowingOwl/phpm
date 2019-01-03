import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { BaseField, SelectField } from '.';

class DeviceDetailSelect extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
  };
  handleSelect = field => value => {
    this.setState({
      [field]: value,
    });
  };
  render() {
    const { device, handleSelect, options } = this.props;
    const { vendor, storage, color } = options;

    return (
      <>
        <h2>{device.device_name}</h2>
        <Divider />
        <BaseField label="판매가 :" text={device.factory_price} />
        <BaseField label="트렌드 :" text="기본트렌드" />
        <Divider />
        <SelectField
          placeholder="[필수] 통신사 선택"
          value={vendor}
          label="통신사"
          data={device.vendors.map(item => ({
            value: item,
            label: item,
          }))}
          onSelect={handleSelect('vendor')}
        />
        <SelectField
          placeholder="[필수] 색상 선택"
          value={color}
          label="색깔"
          data={device.colors.map(item => ({
            value: item,
            label: item,
          }))}
          onSelect={handleSelect('color')}
        />
        <SelectField
          placeholder="[필수] 용량 선택"
          value={storage}
          label="용량"
          data={device.storages.map(item => ({
            value: item,
            label: item,
          }))}
          onSelect={handleSelect('storage')}
        />
      </>
    );
  }
}

export default DeviceDetailSelect;
