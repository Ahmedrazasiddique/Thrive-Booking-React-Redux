import React from 'react';
import Clock from '../../../../../assets/icons/Clock.svg';
import file from '../../../../../assets/icons/file.svg';
import user from '../../../../../assets/icons/user.svg';
import page from '../../../../../assets/icons/page.svg';
import payment from '../../../../../assets/icons/payment.svg';
import report from '../../../../../assets/icons/report.svg';
import HelpSection from './Components/HelpSection';

export const HelpSectionView = () => {
  const helps = [
    {
      cover: Clock,
      title: 'Individual Scheduling',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      cover: file,
      title: 'Auto-Assigned Meetings',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      cover: user,
      title: 'Team Member Selection',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      cover: page,
      title: 'Team-Wide Pages',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      cover: payment,
      title: 'Centralized Billing',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      cover: report,
      title: 'Metrics & Reporting',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
  ];

  return (
    <div>
      <div className="help-center wrapper">
        <div className="heading">Meetocto Can Help You</div>
        <div className="row helps">
          <h1>For Teams</h1>
            {helps.map((item, index) => (
              <HelpSection key={index} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
};
